import { Subscription } from "rxjs";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AttachService } from "../../services/attach.service";
import { TranslateService } from "@ngx-translate/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MessageService } from "primeng/api";
import { ConfigService } from "src/app/demo/service/app.config.service";
import { VoiceInfoService } from "../../services/voice-info.service";
import { FileUpload } from "primeng/fileupload";
import uploader from "quill/modules/uploader";

@Component({
    selector: "app-attach-image",
    templateUrl: "./attach-image.component.html",
    styleUrls: ["./attach-image.component.scss"],
})
export class AttachImageComponent implements OnInit {
    uploadedFiles: File | null = null;
    @ViewChild("uploader") fileInput: FileUpload;
    @Input() receivedData: any;
    isEdit: boolean;

    constructor(
        public configService: ConfigService,
        private messageService: MessageService,
        private loader: NgxUiLoaderService,
        public translate: TranslateService,
        private fileUploadService: AttachService
    ) {}

    ngOnInit(): void {
        if (this.receivedData?.id) {
            this.checkVoiceImage(this.receivedData.id);
        }
    }

    onRemoveFile() {
        this.uploadedFiles = null;
    }

    onFileSelected(event: any) {
        this.messageService.clear("c");
        const file = event.files[0];
        if (file) {
            this.uploadedFiles = file;
        }
    }

    onUpload() {
        if (this.uploadedFiles && this.receivedData?.id) {
            let id = this.receivedData?.id;
            if (this.isEdit == true) {
                this.fileUploadService
                    .updateUploadedImage(this.uploadedFiles, id)
                    .subscribe({
                        next: (res) => {
                            this.messageService.add({
                                severity: "success",
                                summary: "success",
                                detail: res.status,
                            });
                            this.uploadedFiles = null;
                            this.loader.stop();
                            this.fileInput.clear();
                        },
                        error: (err) => {
                            this.loader.stop();
                            this.messageService.add({
                                severity: "error",
                                summary: "error",
                                detail: err,
                            });
                        },
                    });
            } else {
                this.fileUploadService
                    .uploadImage(this.uploadedFiles, id)
                    .subscribe({
                        next: (res) => {
                            this.messageService.add({
                                severity: "success",
                                summary: "success",
                                detail: res.status,
                            });
                            this.uploadedFiles = null;
                            this.loader.stop();
                            this.fileInput.clear();
                        },
                        error: (err) => {
                            console.log(err);
                            this.loader.stop();
                            this.messageService.add({
                                severity: "error",
                                summary: "error",
                                detail: err,
                            });
                        },
                    });
            }
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "warn",
                detail: "No Voice ID Selected To Upload Image Or Add File ...!",
            });
        }
    }

    checkVoiceImage(voiceId): any {
        this.fileUploadService.getVoiceImage(voiceId).subscribe({
            next: (res) => {
                if (res.items.length > 0) {
                    this.isEdit = true;
                }
                this.isEdit = false;
                this.loader.stop();
                console.log(this.isEdit);
            },
            error: (err) => {
                console.log(err);
                this.loader.stop();
                this.messageService.add({
                    severity: "error",
                    summary: "error",
                    detail: err,
                });
            },
        });
    }

    test(): void {
        if (!this.uploadedFiles) {
          console.error('No file selected');
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
        //   const base64String = (reader.result as string).split(',')[1]; // Strip the base64 prefix
        let base64String = this.uploadedFiles;
          this.fileUploadService.test(base64String).subscribe(
            (response) => {
              console.log('Image uploaded successfully: ' + response.data.url);
            },
            (error) => {
              console.error('Upload error', error);
            }
          );
        };
        reader.readAsDataURL(this.uploadedFiles);
      }
}
