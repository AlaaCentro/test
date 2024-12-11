import { Observable } from "rxjs";
import { ColumnTypes } from "../enums/column-types.enum";

export interface Column {
    field: string;
    title: string;
    hidden?: boolean;
    sortable?: boolean;
    searchable?: boolean;
    editable?: boolean;
    frozen?: boolean;
    pipe?: Pipes | string;
    resizable?: boolean;
    width?: ColumnWidth;
    reorderable?: boolean;
    pipeFormat?: string;
    showTooltip?: boolean;
    editModeType?: string;
    dropDownFieldName?: string;
    dropDownItemsList?: any[];
    searchSettings?: SearchFieldSettings;
    type?: ColumnTypes,
    showDelete?: boolean;

}

export interface SearchFieldSettings {
    dtoName?: string;
    label?: string;
    ListOptions?: [];
    listOptionsAsync?: (searchTerm?) => Observable<any[]>;
    optionLabel?: string,
    optionValue?: string,
    searchType?: any,
    toggleOption1?: { label: string, value: string } | string,
    toggleOption2?: { label: string, value: string } | string,
    pipeValue?: (value: any) => string | object,
    formControlName?: string;
}

export enum Pipes {
    date = 'date',
    money = 'money',
    number = 'number'
}

export enum ColumnWidth {
    /**
     * @summary For: name
     */
    default = '200px',
    /**
     * @summary For: actions
     */
    col50 = '50px',
    col80 = '80px',
    col100 = '100px',
    /**
     * @summary For: Code
     */
    col150 = '150px',
    /**
     * @summary For : URL
     */
    col300 = '300px'
}
