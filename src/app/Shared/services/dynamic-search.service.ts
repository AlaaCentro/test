import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FilterMatchMode } from 'primeng/api';
import { SearchFieldModel } from '../dtos/search-field-model';
import { SearchModel } from '../dtos/search-model';
import { Column, Pipes } from '../../Shared/models/columns';
import { ColumnTypes } from "../../../app/Shared/enums/column-types.enum";
import { SearchTypes } from "../../../app/Shared/enums/search-types.enum";
@Injectable({
    providedIn: 'root'
})
export class DynamicSearchService {
    stringMatchModeOptions: { label: any; value: any; }[];
    dateMatchModeOptions: { label: any; value: any; }[];
    numberModeOptions: { label: any; value: string; }[];
    optionsModeOptions: { label: any; value: string; }[];
    constructor(
        private _translationHelper: TranslateService,
        private _fb: FormBuilder
    ) {
        setTimeout(() => {
            this.createSearchOptions();
        });
    }

    createForm(columns) {
        var Fields: any = {};
        columns.forEach((column: Column) => {
            if (column.searchable === false || column.hidden) {
                return;
            }
            var formControlName =
                column.searchSettings && column.searchSettings.dtoName
                    ? column.searchSettings.dtoName
                    : column.field;
            var defaultOpertator = FilterMatchMode.EQUALS;
            if (column.searchSettings && column.searchSettings.searchType) {
                if (
                    column.searchSettings.searchType == this.searchTypes.Number ||
                    column.searchSettings.searchType == this.searchTypes.Text
                ) {
                    defaultOpertator = FilterMatchMode.CONTAINS;
                }
            } else if (
                column.type == ColumnTypes.NUMBER ||
                column.type == ColumnTypes.TEXT
            ) {
                defaultOpertator = FilterMatchMode.CONTAINS;
            }

            Fields[formControlName] = [''];

            Fields[formControlName + 'Operator'] = [defaultOpertator];
            if (column.searchSettings) {
                column.searchSettings.formControlName = formControlName;
            } else {
                column.searchSettings = { formControlName };
            }
        });
        return this._fb.group(Fields);
    }

    buildSearchFields(columns: Column[], form: FormGroup): SearchFieldModel[] {
        var searchModel: SearchModel = {};
        searchModel.searchFields = [];
        const formValues = form.value;
        columns.forEach((col) => {
            var colControlName =
                col.searchSettings && col.searchSettings.dtoName
                    ? col.searchSettings.dtoName
                    : col.field;
            var value = formValues[colControlName];

            if (value) {
                const searchField = {
                    fieldName: colControlName,
                    operator: formValues[colControlName + 'Operator'], //filter.matchMode,
                    value:
                        col.searchSettings && col.searchSettings.pipeValue
                            ? col.searchSettings.pipeValue(value)
                            : value,
                };
                if (
                    (col.searchSettings &&
                        col.searchSettings.searchType == SearchTypes.Date) ||
                    col.searchSettings.searchType == SearchTypes.Time ||
                    col.searchSettings.searchType == SearchTypes.DateTime
                ) {
                    searchField['dateSearchType'] = col.searchSettings.searchType;
                }
                if (
                    col.type == ColumnTypes.DATE ||
                    col.type == ColumnTypes.DATETIME ||
                    col.type == ColumnTypes.TIME
                ) {
                    searchField['dateSearchType'] =
                        col.type == ColumnTypes.DATE
                            ? 'Date'
                            : col.type == ColumnTypes.DATETIME
                                ? 'DateTime'
                                : col.type == ColumnTypes.TIME
                                    ? 'TimeSpan'
                                    : 'DateTime';
                }
                searchModel.searchFields.push(searchField);
            }
        });
        return searchModel.searchFields;
    }

    setDefaultOperators(columns: Column[], form: FormGroup): FormGroup {

        columns.forEach((column: Column) => {
            if (!column.searchable || column.hidden) {
                return;
            }
            var formControlName =
                column.searchSettings && column.searchSettings.dtoName
                    ? column.searchSettings.dtoName
                    : column.field;
            var defaultOpertator = FilterMatchMode.EQUALS;

            if (column.searchSettings && column.searchSettings.searchType) {
                if (
                    column.searchSettings.searchType == this.searchTypes.Number ||
                    column.searchSettings.searchType == this.searchTypes.Text

                ) {
                    defaultOpertator = FilterMatchMode.CONTAINS;
                }
            } else if (
                column.type == ColumnTypes.NUMBER ||
                column.type == ColumnTypes.TEXT ||
                !column.type
            ) {
                defaultOpertator = FilterMatchMode.CONTAINS;
            }

            form.get(formControlName + 'Operator').setValue(defaultOpertator);

        });
        return form;
    }

    get searchTypes() {
        return SearchTypes;
    }
    get columnTypes() {
        return ColumnTypes;
    }
    //#region Messaging
    createSearchOptions() {

        this.stringMatchModeOptions = [
            { label: this._translationHelper.instant('common.startsWith'), value: FilterMatchMode.STARTS_WITH },
            { label: this._translationHelper.instant('common.endsWith'), value: FilterMatchMode.ENDS_WITH },
            { label: this._translationHelper.instant('common.contains'), value: FilterMatchMode.CONTAINS },
            { label: this._translationHelper.instant('common.notContains'), value: FilterMatchMode.NOT_CONTAINS },
            { label: this._translationHelper.instant('common.equal'), value: FilterMatchMode.EQUALS },
            { label: this._translationHelper.instant('common.notEqual'), value: FilterMatchMode.NOT_EQUALS },
        ];

        this.dateMatchModeOptions = [
            { label: this._translationHelper.instant('common.equal'), value: FilterMatchMode.EQUALS },
            { label: this._translationHelper.instant('common.notEqual'), value: FilterMatchMode.NOT_EQUALS },
            { label: this._translationHelper.instant('common.greaterThan'), value: FilterMatchMode.GREATER_THAN },
            {
                label: this._translationHelper.instant('common.greaterThanOrEqual'),
                value: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
            },
            { label: this._translationHelper.instant('common.lessThan'), value: FilterMatchMode.LESS_THAN },
            {
                label: this._translationHelper.instant('common.lessThanOrEqual'),
                value: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            },
        ];

        this.numberModeOptions = [
            { label: this._translationHelper.instant('common.startsWith'), value: FilterMatchMode.STARTS_WITH },
            { label: this._translationHelper.instant('common.endsWith'), value: FilterMatchMode.ENDS_WITH },
            { label: this._translationHelper.instant('common.contains'), value: FilterMatchMode.CONTAINS },
            { label: this._translationHelper.instant('common.notContains'), value: FilterMatchMode.NOT_CONTAINS },
            { label: this._translationHelper.instant('common.equal'), value: FilterMatchMode.EQUALS },
            { label: this._translationHelper.instant('common.notEqual'), value: FilterMatchMode.NOT_EQUALS },
            { label: this._translationHelper.instant('common.greaterThan'), value: FilterMatchMode.GREATER_THAN },
            {
                label: this._translationHelper.instant('common.greaterThanOrEqual'),
                value: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
            },
            { label: this._translationHelper.instant('common.lessThan'), value: FilterMatchMode.LESS_THAN },
            {
                label: this._translationHelper.instant('common.lessThanOrEqual'),
                value: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            },
        ];
        this.optionsModeOptions = [
            { label: this._translationHelper.instant('common.equal'), value: FilterMatchMode.EQUALS },
            { label: this._translationHelper.instant('common.notEqual'), value: FilterMatchMode.NOT_EQUALS },
        ];
    }
}
