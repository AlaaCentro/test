import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { SystemConfiguration } from './modules/auth/models/system-configuration';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    topbarTheme = 'light';

    menuTheme = 'dim';

    layoutMode: string; // 'light';

    menuMode: string; // = 'static';

    isRTL: boolean; // = false;

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig, public translate: TranslateService, private userService: AuthService, private router: Router) {
        translate.addLangs(['en', 'ar']);
        if (localStorage.getItem('lang')) {
            translate.setDefaultLang(localStorage.getItem('lang'));
        }
        else {
            translate.setDefaultLang('en');
            this.isRTL = false;
            localStorage.setItem('menuMode', 'static');
            localStorage.setItem('layoutMode',  'light');
        }

    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
    switchLang(lang: string) {
        this.translate.use(lang);
        const SystemConf: SystemConfiguration = {
            id: this.userService.currentUser?.id,
            colorMode: localStorage.getItem('layoutMode'),
            defaultLanguage: localStorage.getItem('lang'),
            menuMode: localStorage.getItem('menuMode')
        };
    }
}
