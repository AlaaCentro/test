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
import {
    MessageService,
    ConfirmationService,
    LazyLoadEvent,
} from "primeng/api";
import { Table } from "primeng/table";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { Column, Pipes } from "../../models/columns";

@Component({
    selector: "app-scrolle-list",
    templateUrl: "./scrolle-list.component.html",
    styleUrls: ["./scrolle-list.component.scss"],
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
export class ScrolleListComponent implements OnInit {
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
    @Output("onLazyClick") onLazyClick = new EventEmitter<any>();
    @Output("onToggleStatusClick") onToggleStatusClick =
        new EventEmitter<any>();
    clonedProducts: { [s: string]: any } = {};
    isEditRowMode = false;
    isDeleteRowMode = false;
    private currentLang: any;

    @ViewChild("filter") filter: ElementRef;

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

    onLazyInit(event: LazyLoadEvent) {
        this.onLazyClick.emit(event);
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
}
