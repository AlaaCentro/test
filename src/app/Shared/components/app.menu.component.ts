import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            // {
            //     label: 'menu.dashboard', icon: 'dashboard-icon', class: ' ',
            //     items: [
            //         { label: 'menu.dashboard', icon: 'dashboard-icon', routerLink: ['/home'] },
            //     ]
            // },
            {
                label: 'menu.inBound', icon: 'inBound-icon', class: ' ',
                items: [
                    { label: 'menu.inBound', icon: 'inBound-icon', routerLink: ['/inbound/mainInBound'] },
                ]
            },
            // {
            //     label: 'menu.setting', icon: 'setup-menu-icon', class: ' ', routerLink: ['/Setting'],
            //     items: [
            //         {
            //             label: 'menu.setting', icon: 'setup-menu-icon', class: '', routerLink: ['/Setting'],
            //             items: [
            //                 {
            //                     label: 'menu.companyProfile', icon: 'companyProfile-icon', routerLink: ['/Setting/companyProfile']
            //                 },
            //                 {
            //                     label: 'menu.employeeManagement', icon: 'employeeManagement-icon', class: 'title', routerLink: ['/Setting/EM'],
            //                     items: [
            //                         { label: 'menu.generalSetting', icon: 'generalSetting-icon', routerLink: ['/Setting/EM/generalSetting'] }
            //                     ]
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ];
    }
}
