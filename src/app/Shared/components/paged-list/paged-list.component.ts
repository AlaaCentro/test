import { DatePipe } from "@angular/common";
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
    ConfirmationService,
    FilterMetadata,
    LazyLoadEvent,
    MessageService,
    SortEvent,
} from "primeng/api";
import { Table } from "primeng/table";
import { PaginationMetaData } from "../../dtos/pagination-meta-data";
import { SearchModel } from "../../dtos/search-model";
import { Column, Pipes } from "../../models/columns";
import { DynamicSearchService } from "../../services/dynamic-search.service";
import * as FileSaver from "file-saver";

@Component({
    selector: "app-paged-list",
    templateUrl: "./paged-list.component.html",
    styleUrls: ["./paged-list.component.scss"],
})
export class PagedListComponent implements OnInit {
    datePipe = new DatePipe("en-us");
    @Input("columns") columns: Column[] = [];
    @Input() paginationMetaData: PaginationMetaData;
    @Input() enableDargDrop: boolean = false;
    @Output() lazyLoadData: EventEmitter<any> = new EventEmitter();

    loading: boolean;
    searchModel: SearchModel = {
        searchFields: [],
    };
    searchField = {};
    stringMatchModeOptions: { label: string; value: any }[];
    dateMatchModeOptions: { label: string; value: any }[];
    numberModeOptions: { label: string; value: any }[];
    showSearch: any;
    @ViewChild("dt1") dataTable: Table;
    exportColumns: { title: any; dataKey: any }[];
    // Old PArams
    @Input("globalFilterFields") globalFilterFields: string[];
    @Input("itemsList") itemsList: any[];
    @Input("selectlist") selectList: any[];
    @Input("HideEditBtn") HideEditBtn?: boolean;
    @Input("HideDeleteBtn") HideDeleteBtn?: boolean;
    @Input("ShowCustomEdit") ShowCustomEdit?: boolean;

    @Output("onDeleteClick") onDeleteClick = new EventEmitter<any>();
    @Output("onUpdateClick") onUpdateClick = new EventEmitter<any>();
    @Output("onCustomEditClick") onCustomEditClick = new EventEmitter<any>();
    // @Output('loadData') loadData = new EventEmitter<any>();
    clonedProducts: { [s: string]: any } = {};
    isEditRowMode = false;
    isDeleteRowMode = false;
    totalRecords = 0;
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

    constructor(
        private translate: TranslateService,
        public dynamicSearchService: DynamicSearchService,
        private messageService: MessageService,
        public confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loading = false;
    }

    customSort(event: SortEvent) {
        if (!event.field) {
            return;
        }

        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === "string" && typeof value2 === "string")
                result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }

    showLoading() {
        this.loading = true;
    }

    hideLoading() {
        this.loading = false;
    }

    openSearch() {
        this.showSearch = true;
    }

    getData(event: any) {
        this.buildSearchModel(event);
        this.lazyLoadData.emit(this.searchModel);
    }

    buildSearchModel(event) {
        if (Object.keys(event.filters).length !== 0) {
            var filters = event.filters;

            this.searchModel.searchFields = [];
            if (event.globalFilter) {
                Object.entries(filters).forEach(([key, value], index) => {
                    this.searchModel.searchFields.push({
                        fieldName: key,
                        value: event.globalFilter,
                        operator: "contains",
                    });
                });
            } else {
                Object.entries(filters).forEach(([key, value], index) => {
                    if (value[0].value) {
                        this.searchModel.searchFields.push({
                            fieldName: key,
                            value: value[0].value,
                            operator: value[0].matchMode,
                        });
                    }
                });
            }
        }
        this.searchModel.orderBy = event.sortField;

        this.searchModel.orderType = event.sortOrder === 1 ? "asc" : "desc";
        if (event.first / event.rows < 1) {
            this.searchModel.pageNumber = 1;
        } else {
            this.searchModel.pageNumber = event.first / event.rows + 1;
        }
        this.searchModel.pageSize = event.rows;
    }

    searchLocal() {
        if (
            !this.searchModel.searchFields ||
            this.searchModel.searchFields.length == 0
        ) {
            Object.keys(this.dataTable.filters).forEach((key) => {
                var metData = this.dataTable.filters[key] as FilterMetadata;
                this.dataTable.filter("", key, metData.operator);
            });
        }
        this.searchModel.searchFields.forEach((searchField) => {
            this.dataTable.filter(
                searchField.value,
                searchField.fieldName,
                searchField.operator
            );
        });
    }

    OnCustomEditInit(item: any) {
        this.onCustomEditClick.emit(item);
    }

    onRowEditInit(itm: any) {
        this.clonedProducts[itm.id] = { ...itm };
        this.isEditRowMode = true;
        this.isDeleteRowMode = false;
    }

    onRowDeleteInit(itm: any) {
        if (this.onDeleteClick) {
            delete this.clonedProducts[itm.id];
            this.onDeleteClick.emit(itm);
        }
        this.isEditRowMode = this.isDeleteRowMode = false;
    }

    onRowEditSave(itm: any) {
        if (this.onUpdateClick) {
            delete this.clonedProducts[itm.id];
            this.onUpdateClick.emit(itm);
        }
        this.isEditRowMode = this.isDeleteRowMode = false;
    }

    onRowEditCancel(itm: any, index: number) {
        this.itemsList[index] = this.clonedProducts[itm.id];
        delete this.clonedProducts[itm.id];
        this.isEditRowMode = this.isDeleteRowMode = false;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = "";
        this.searchModel.searchFields = [];
        // let sortOrder = 1;
        this.getData({ filters: {}, first: 0, rows: table.rows });
    }

    exportExcel() {
        import("xlsx").then((xlsx) => {
            const displayedColumns = this.columns.filter(
                (col) => col.field && !col.hidden
            );
            const itemsToExport = this.itemsList.map((item) => {
                const exportedItem = {};
                displayedColumns.forEach((col) => {
                    exportedItem[col.field] = item[col.field];
                });
                return exportedItem;
            });
            const worksheet = xlsx.utils.json_to_sheet(itemsToExport);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            this.saveAsExcelFile(excelBuffer, "");
        });
    }

    exportPdf() {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then((autoTable) => {
                const doc = new jsPDF.default();
                doc.setFont("Amiri"); // This will work if the font is correctly loaded

                const translatedTitles = this.columns.map((col) =>
                    this.translate.instant(col.title)
                );
                autoTable.default(doc, {
                    head: [translatedTitles],
                    body: this.itemsList.map((item) =>
                        this.columns.map((col) => item[col.field])
                    ),
                    styles: {
                        font: "Amiri",
                    },
                });
                doc.save("Patient.pdf");
            });
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
    }
}
