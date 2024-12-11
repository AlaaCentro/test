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
import { CustomerOpnionEnum } from "../../enums/customer-opnion-enum";
import { HistoryService } from "../../services/history.service";
import { ComponsationService } from "../../services/componsation.service";

@Component({
    selector: "app-componsation",
    templateUrl: "./componsation.component.html",
    styleUrls: ["./componsation.component.scss"],
})
export class ComponsationComponent implements OnInit, OnChanges {
    @Output("columns") columns1: Column[];
    @Output("columns") columns2: Column[];
    @Output("globalFilterFields") globalFilterFields: string[];
    @Output() chaissChanged = new EventEmitter<any>();
    @Input() searched: any;
    itemsList1: any[];
    itemsList2: any[];
    loading = true;
    ShowAddNew = false;
    d1 = false;
    @ViewChild("filter") filter: ElementRef;
    opnionList: any[];

    constructor(
        public configService: ConfigService,
        private service: ComponsationService,
        private messageService: MessageService,
        private loader: NgxUiLoaderService,
        public translate: TranslateService
    ) {}

    ngOnInit() {
        this.fillColumns1();
        this.fillColumns2();

        if (this.searched) {
            this.GetServiceList1();
            this.GetServiceList2();
        }

    }

    fillColumns2() {
        this.columns2 = [
            {
                field: "job_card",
                title: "componsation.jobNo",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "req_id",
                title: "componsation.reqId",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "status",
                title: "componsation.status",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "approved_days",
                title: "componsation.approvedDays",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "process_date",
                title: "componsation.processDate",
                hidden: false,
                showTooltip: true,
                pipe: Pipes.date,
            }
        ]
    }

    fillColumns1() {
        const fieldValue = 'Y'; // This can be dynamic based on your condition

        this.columns1 = [
            {
                field: "voice_id",
                title: "componsation.voiceId",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "created_date",
                title: "componsation.creDate",
                hidden: false,
                showTooltip: true,
                pipe: Pipes.date,
            },
            {
                field: "days",
                title: "componsation.days",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "com_status",
                title: "componsation.completed",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "waiting_cust_doc",
                title: "componsation.waitedCust",
                hidden: false,
                showTooltip: true,
            }
        ];
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes["searched"] && changes["searched"].currentValue) {
            this.GetServiceList1();
            this.GetServiceList2();
        }
    }

    GetServiceList1() {
        this.loader.start();
        this.service.GetComponsationList1(this.searched).subscribe({
            next: (res) => {
                if (res.succeeded === false) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.message,
                    });
                    this.loader.stop();
                    this.itemsList1 = [];
                    return;
                }
                this.itemsList1 = res.items;
                this.loader.stop();
            },
        });
    }

    GetServiceList2() {
        this.loader.start();
        this.service.GetComponsationList2(this.searched).subscribe({
            next: (res) => {
                if (res.succeeded === false) {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.message,
                    });
                    this.loader.stop();
                    this.itemsList2 = [];
                    return;
                }
                this.itemsList2 = res.items;
                this.loader.stop();
            },
        });
    }

    get opnionVal() {
        return CustomerOpnionEnum;
    }
}
