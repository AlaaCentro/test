//import { PaginationMetaData } from "./pagination-meta-data";

import { PaginationMetaData } from "./pagination-meta-data";

export interface PagedListDto<T> {
    pagingData: PaginationMetaData;
    entities: T[];

    // totalCount: number;
    // pageNumber: number;
    // totalPages: number;
    // pageSize: number;
    // hasPreviousPage: boolean;
    // hasNextPage: boolean;
    // items: T
}
