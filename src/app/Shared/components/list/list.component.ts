import { AuthService } from "src/app/modules/auth/services/auth.service";
import { MessageService, ConfirmationService } from "primeng/api";
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Table } from "primeng/table";
import { Column, Pipes } from "../../../Shared/models/columns";
import { CustomerOpnionEnum } from "src/app/modules/in-bound/enums/customer-opnion-enum";

@Component({
    selector: "app-shared-list",
    templateUrl: "./list.component.html",
    styleUrls: [
        "./../../../../assets/demo/badges.scss",
        "./list.component.scss",
    ],
    styles: [
        `
            :host ::ng-deep .p-frozen-column {
                font-weight: bold;
            }

            :host ::ng-deep .p-datatable-frozen-tbody {
                font-weight: bold;
            }

            :host ::ng-deep .p-progressbar {
                height: 0.5rem;
            }
        `,
    ],
})
export class ListComponent implements OnInit {
    @ViewChild("dataTable") dataTable: Table;
    @Input("loading") loading: boolean = true;
    @Input("columns") columns: Column[];
    @Input("globalFilterFields") globalFilterFields: string[];
    @Input("itemsList") itemsList: any[];
    @Input("selectlist") selectList: any[];
    @Input("HideEditBtn") HideEditBtn?: boolean;
    @Input("HideDeleteBtn") HideDeleteBtn?: boolean;
    @Output("onDeleteClick") onDeleteClick = new EventEmitter<any>();
    @Output("onUpdateClick") onUpdateClick = new EventEmitter<any>();
    @Output("onRowSelected") onRowSelected = new EventEmitter<any>();
    @Output("onToggleStatusClick") onToggleStatusClick =
        new EventEmitter<any>();
    clonedProducts: { [s: string]: any } = {};
    isEditRowMode = false;
    isDeleteRowMode = false;
    private currentLang: any;
    selected: any;

    @ViewChild("filter") filter: ElementRef;

    getFieldValue(value) {
        if (value === null || value === undefined) {
            return "";
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
    toggleStatus(value, item) {
        item.isActive = value;
        this.onToggleStatusClick.emit(item);
    }

    constructor(
        private translate: TranslateService,
        private messageService: MessageService,
        public confirmationService: ConfirmationService,
        private authService: AuthService
    ) {
        //this.currentTenentId = Number(authService.currentUser.TenantId);
    }
    get filteredColumns() {
        return this.columns.filter((col) => !col.hidden);
    }
    ngOnInit() {
        this.loading = false;
    }
    onRowEditInit(item: any) {
        this.onUpdateClick.emit(item);
    }

    onRowDeleteInit(itm: any) {
        this.onDeleteClick.emit(itm);
    }

    clear() {
        this.dataTable.clear();
        this.filter.nativeElement.value = "";
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
                this.onToggleStatusClick.emit(item);
            },
            reject: (type) => {},
            key: "positionDialog",
        });
    }

    onRowInitSelected(item: any) {
        this.onRowSelected.emit(item);
    }

    get opnionVal() {
        return CustomerOpnionEnum;
    }
}
