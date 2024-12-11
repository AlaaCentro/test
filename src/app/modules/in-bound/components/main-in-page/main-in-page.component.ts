import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { ConfigService } from "src/app/demo/service/app.config.service";
import { ComponentName } from "../../enums/component-name";
import { TranslateService } from "@ngx-translate/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { VoiceInfoService } from "../../services/voice-info.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionComponent } from "../action/action.component";
import { SearchFieldEnum } from "../../enums/search-field-enum";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MainInBoundService } from "../../services/main-in-bound.service";
import { PermissionService } from "src/app/modules/auth/services/permission.service";

@Component({
    selector: "app-main-in-page",
    templateUrl: "./main-in-page.component.html",
    styleUrls: ["./main-in-page.component.scss"],
})
export class MainInPageComponent implements OnInit {
    @ViewChild(ActionComponent) actionRef!: ActionComponent;
    infoData: any;
    voiceInfo: boolean = true;
    action: boolean = false;
    Attach: boolean = false;
    History: boolean = false;
    Service: boolean = false;
    Componsation: boolean = false;
    Query: boolean = false;
    Pending: boolean = false;
    title: string = this.translate.instant("inBound.voice_information");
    currentComponent: ComponentName;
    searched!: number;
    searchedData: any;
    showSearch: boolean = false;
    seaechFieldList: any[];
    form: FormGroup;
    formSubmited: boolean = false;

    onVoiceInfoDataReceived(data: any) {
        this.searchedData = data;
    }

    constructor(
        public configService: ConfigService,
        private voiceService: VoiceInfoService,
        private messageService: MessageService,
        private loader: NgxUiLoaderService,
        public translate: TranslateService,
        private router: ActivatedRoute,
        private fb: FormBuilder,
        private service: MainInBoundService,
        private permission: PermissionService
    ) {
        this.seaechFieldList = Object.keys(SearchFieldEnum)
            .map((key) => ({
                label: SearchFieldEnum[key],
                value: Number(key),
            }))
            .filter((x) => !isNaN(Number(x.value)));
        this.showSearch = false;
        this.router.paramMap.subscribe((params) => {
            const email = params.get("email");

            if (email) {
                this.getPermission(email);
            } else {
                console.warn("No email provided in the URL.");
            }
        });
    }

    getPermission(email: string) {
        this.permission.fetchAndSetPermission(email);
    }

    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.title = this.componentTitleMap[this.currentComponent]
                ? this.translate.instant(
                      this.componentTitleMap[this.currentComponent]
                  )
                : "";
        });
        this.router.paramMap.subscribe((params) => {
            this.messageService.clear();
            const inboundId = params.get("inboundId");
            if (inboundId) {
                this.GetInboundData(inboundId);
            }
        });
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            type: [null, Validators.required],
            field: [""],
        });
    }

    GetInboundData(query) {
        this.loader.start();
        this.voiceService.GetInboundDataByChass(query).subscribe({
            next: (res) => {
                if (res.succeeded === false) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.message,
                    });
                    this.loader.stop();
                    return;
                }
                this.infoData = res;
                if (res.items.length > 1) {
                    const chissesList = res.items.map(
                        (item) => item.vm_chassis_no
                    );
                    this.messageService.add({
                        key: "c",
                        severity: "success",
                        summary: this.translate.instant("inBound.note"),
                        sticky: true,
                        detail: this.translate.instant("inBound.select"),
                        data: {
                            chisses: chissesList,
                        },
                    });
                } else if (res.items.length == 1) {
                    this.searched = res.items[0].vm_chassis_no;
                } else {
                    this.showSearch = true;
                }
                this.loader.stop();
            },
            error: (error) => {
                this.messageService.add({
                    severity: "error",
                    summary: "Error",
                    detail: this.translate.instant("messages.connectionFailed"),
                });
                this.loader.stop();
            },
        });
    }

    get Components() {
        return ComponentName;
    }

    private componentTitleMap = {
        [ComponentName.Voice_Info]: "inBound.voice_information",
        [ComponentName.Action]: "inBound.action",
        [ComponentName.Attach]: "inBound.attached_image",
        [ComponentName.History]: "inBound.history",
        [ComponentName.Service]: "inBound.services_history",
        [ComponentName.Componsation]: "inBound.compensation",
        [ComponentName.Pending]: "inBound.pending_for_close",
        [ComponentName.Query]: "inBound.query_ref_no",
    };

    displayComp(e: ComponentName) {
        this.voiceInfo = false;
        this.action = false;
        this.Attach = false;
        this.History = false;
        this.Service = false;
        this.Componsation = false;
        this.Query = false;
        this.Pending = false;
        this.onVoiceInfoDataReceived(this.searchedData);

        this.currentComponent = e;
        this.title = this.componentTitleMap[e]
            ? this.translate.instant(this.componentTitleMap[e])
            : "";

        switch (e) {
            case ComponentName.Voice_Info:
                this.voiceInfo = true;
                break;
            case ComponentName.Action:
                this.action = true;
                break;
            case ComponentName.Attach:
                this.Attach = true;
                break;
            case ComponentName.History:
                this.History = true;
                break;
            case ComponentName.Service:
                this.Service = true;
                break;
            case ComponentName.Componsation:
                this.Componsation = true;
                break;
            case ComponentName.Pending:
                this.Pending = true;
                break;
            case ComponentName.Query:
                this.Query = true;
                break;
        }
    }

    onChassisSelect(e) {
        this.searched = e;
    }

    SearchChaiss() {
        if (this.form.get("type").value == null) {
            this.formSubmited = true;
            return;
        }
        this.loader.start();
        const itm = this.form.value;
        const type = itm.type;
        const chass =
            type === SearchFieldEnum.Chassis
                ? this.form.get("field").value
                : null;
        const plate =
            type !== SearchFieldEnum.Chassis
                ? this.form.get("field").value
                : null;
        this.service.GetChassNum(chass, plate).subscribe({
            next: (res) => {
                if (!res) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: "No Chaiss No...",
                    });
                } else {
                    this.searched = res.items[0].jm_chassis_no;
                    this.showSearch = false;
                    this.form.reset();
                }
                this.formSubmited = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: "error",
                    summary: "Error",
                    detail: "An unexpected error occurred.",
                });
                this.formSubmited = false;
                this.loader.stop();
            },
            complete: () => {
                this.formSubmited = false;
                this.loader.stop();
            },
        });
    }

    CloseDialog() {
        this.form.reset();
        this.formSubmited = false;
    }
}
