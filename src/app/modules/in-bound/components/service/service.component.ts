import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MessageService } from "primeng/api";
import { ConfigService } from "src/app/demo/service/app.config.service";
import { Column, Pipes } from "src/app/Shared/models/columns";
import { VoiceInfoService } from "../../services/voice-info.service";
import { ServiceHistoryService } from "../../services/service-history.service";

@Component({
    selector: "app-service",
    templateUrl: "./service.component.html",
    styleUrls: ["./service.component.scss"],
})
export class ServiceComponent implements OnInit, OnChanges {
    @Output("columns") columns: Column[];
    @Output("globalFilterFields") globalFilterFields: string[];
    @Output() chaissChanged = new EventEmitter<any>();
    @Input() searched: any;

    itemsList: any[];
    loading = true;
    ShowAddNew = false;
    d1 = false;
    @ViewChild("filter") filter: ElementRef;
    opnionList: any[];

    constructor(
        public configService: ConfigService,
        private service: ServiceHistoryService,
        private messageService: MessageService,
        private loader: NgxUiLoaderService,
        public translate: TranslateService
    ) {}

    ngOnInit() {
        const lang = this.translate.currentLang;
        this.fillColumns();

        if (this.searched) {
            this.GetServiceList();
        }

        this.translate.onLangChange.asObservable().subscribe(x => {
            this.fillColumns();
        })
    }

    fillColumns() {
        const lang = this.translate.currentLang;
        this.columns = [
            {
                field: "job_card",
                title: "service.jobNo",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "location_arb",
                title: "service.location",
                hidden: lang == "en",
                showTooltip: true,
            },
            {
                field: "location_eng",
                title: "service.location",
                hidden: lang == "ar",
                showTooltip: true,
            },
            {
                field: "job_name_ara",
                title: "service.jobName",
                hidden: lang == "en",
                showTooltip: true,
            },
            {
                field: "job_name_eng",
                title: "service.jobName",
                hidden: lang == "ar",
                showTooltip: true,
            },
            {
                field: "job_date",
                title: "service.jobDate",
                hidden: false,
                showTooltip: true,
                pipe: Pipes.date,
            },
            {
                field: "matrl_amount",
                title: "service.martlAmt",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "lab_amount",
                title: "service.labAmt",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "invoice_date",
                title: "service.invoiceDate",
                hidden: false,
                showTooltip: true,
                pipe: Pipes.date,
            },
            {
                field: "speedo_mrt_reading",
                title: "service.speedMrtRedng",
                hidden: false,
                showTooltip: true,
            },
        ];
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["searched"] && changes["searched"].currentValue) {
            this.GetServiceList();
        }
    }

    GetServiceList() {
        this.loader.start();
        this.service.GetServiceList(this.searched).subscribe({
            next: (res) => {
                if (res.succeeded === false) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.message,
                    });
                    this.loader.stop();
                    this.itemsList = [];
                    return;
                }
                this.itemsList = res.items;
                this.loader.stop();
            },
        });
    }
}
