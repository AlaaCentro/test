import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Column, Pipes } from 'src/app/Shared/models/columns';

@Component({
  selector: 'app-query-ref',
  templateUrl: './query-ref.component.html',
  styleUrls: ['./query-ref.component.scss']
})
export class QueryRefComponent implements OnInit {
    @Output("columns") columns: Column[];
    @Output("globalFilterFields") globalFilterFields: string[];
    // @Output("itemsList") itemsList: any[];
    itemsList: any[];
    loading = true;
    ShowAddNew = false;
    d1 = false;
    @ViewChild("filter") filter: ElementRef;
    opnionList: any[];

    constructor() {}

    ngOnInit() {
        this.itemsList = [
            {
                refNo: 23035,
                voiceId: "#273468236"
            },
        ];

        this.columns = [
            {
                field: "refNo",
                title: "query.refNo",
                hidden: false,
                showTooltip: true,
            },
            {
                field: "voiceId",
                title: "query.voiceId",
                hidden: false,
                showTooltip: true,
            }
        ];
    }

}
