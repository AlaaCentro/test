import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
} from "@angular/core";
import { Column, Pipes } from "src/app/Shared/models/columns";
import { CustomerOpnionEnum } from "../../enums/customer-opnion-enum";
import { TranslateService } from "@ngx-translate/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MessageService } from "primeng/api";
import { ConfigService } from "src/app/demo/service/app.config.service";
import { ServiceHistoryService } from "../../services/service-history.service";
import { HistoryService } from "../../services/history.service";

@Component({
    selector: "app-history",
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit, OnChanges {
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
    item: any = {};

    constructor(
        public configService: ConfigService,
        private service: HistoryService,
        private messageService: MessageService,
        private loader: NgxUiLoaderService,
        public translate: TranslateService
    ) {
        this.opnionList = Object.keys(CustomerOpnionEnum)
            .map((key) => ({
                label: CustomerOpnionEnum[key],
                value: Number(key),
            }))
            .filter((x) => !isNaN(Number(x.value)));
    }

    ngOnInit() {
        const lang = this.translate.currentLang;
        this.fillColumns();

        if (this.searched) {
            this.GetServiceList();
        }

        this.translate.onLangChange.asObservable().subscribe((x) => {
            this.fillColumns();
        });
    }

    fillColumns() {
        const lang = this.translate.currentLang;
        this.columns = [
            {
                field: "voice_id",
                title: "history.id",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "voice_type",
                title: "history.voiceType",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "job_card",
                title: "history.jobcard",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "action_comments",
                title: "history.actionComment",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "close_remarks",
                title: "history.closeRemark",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "close_date",
                title: "history.closeDate",
                hidden: false,
                showTooltip: true,
                pipe: Pipes.date,
            },
            {
                field: "voice_created_date",
                title: "history.createDate",
                hidden: false,
                showTooltip: true,
                pipe: Pipes.date,
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
        this.service.GetHistoryList(this.searched).subscribe({
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

    get opnionVal() {
        return CustomerOpnionEnum;
    }

    onRowSelected(e) {
        this.item = e;
    }
}
