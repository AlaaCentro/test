import {
    Component,
    ElementRef,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Table } from "jspdf-autotable";
import { MessageService, ConfirmationService } from "primeng/api";
import { Column, Pipes } from "src/app/Shared/models/columns";
import { CloseStatusEnum } from "../../enums/close-status-enum";

@Component({
    selector: "app-pending-close",
    templateUrl: "./pending-close.component.html",
    styleUrls: ["./pending-close.component.scss"],
})
export class PendingCloseComponent implements OnInit {
    @Output("columns") columns: Column[];
    @Output("globalFilterFields") globalFilterFields: string[];
    itemsList: any[];
    loading = true;
    ShowAddNew = false;
    d1 = false;
    @ViewChild("filter") filter: ElementRef;
    opnionList: any[];
    closeList: any;

    constructor(
        private translate: TranslateService,
        private messageService: MessageService,
        public confirmationService: ConfirmationService
    ) {
        this.closeList = Object.keys(CloseStatusEnum)
            .map((key) => ({ label: CloseStatusEnum[key], value: Number(key) }))
            .filter((x) => !isNaN(Number(x.value)));
    }

    ngOnInit() {
        this.itemsList = [
            {
                voiceId: 23035,
                locationCom: "Complain",
                callCenterCom: "Test",
                closeCom: "Thank You",
            },
        ];

        this.columns = [
            {
                field: "voiceId",
                title: "pendingClose.voiceId",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "locationCom",
                title: "pendingClose.locationCom",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "callCenterCom",
                title: "pendingClose.callCenterCom",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "closeCom",
                title: "pendingClose.closeCom",
                hidden: false,
                showTooltip: true,
            },
        ];
    }

    getFieldValue(value) {
        if (value === null || value === undefined) {
            return "---";
        } else {
            return value;
        }
    }

    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }

    get Pipes() {
        return Pipes;
    }

    get filteredColumns() {
        return this.columns.filter((col) => !col.hidden);
    }

    confirmChangeStatus(value, item, event: MouseEvent) {
        event.preventDefault();
        this.confirmationService.confirm({
            message: this.translate.instant(
                "messages.changeStatusConfirmation"
            ),
            header: this.translate.instant("messages.confirmation"),
            icon: "pi pi-refresh",
            accept: () => {
                item.isActive = value;
            },
            reject: (type) => {},
            key: "positionDialog",
        });
    }

    get closeEnum() {
        return CloseStatusEnum;
    }
}
