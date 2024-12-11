import { SearchFieldModel } from "./search-field-model";

export interface SearchModel {
    searchFields?: SearchFieldModel[];
    orderBy?: string;
    orderType?: string;
    pageNumber?: number;
    pageSize?: number;
}
