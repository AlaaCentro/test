import { AuthService } from "src/app/modules/auth/services/auth.service";
import { Component } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { AppMainComponent } from "./app.main.component";
import { environment } from "./../../../environments/environment";
import { ConfigService } from "src/app/demo/service/app.config.service";
import { AppConfig } from "src/app/demo/domain/appconfig";
import { SystemConfiguration } from "src/app/modules/auth/models/system-configuration";
import { Router } from "@angular/router";
import { UserChangePasswordDto } from "src/app/modules/auth/dto/user-change-password-dto";

@Component({
    selector: "app-topbar",
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
                    <div class="layout-topbar-logo" id="logolink">
                        <img
                            id="app-logo"
                            [src]="
                                'assets/layout/images/logo/' +
                                (app.topbarTheme === 'light'
                                    ? 'Logo_Dark'
                                    : 'Logo_White') +
                                '.png'
                            "
                            alt="poseidon-layout"
                        />
                    </div>
                </div>

                <div class="layout-topbar-right">
                    <a
                        class="menu-button"
                        (click)="appMain.onMenuButtonClick($event)"
                    >
                        <i class="pi pi-bars"></i>
                    </a>

                    <ul class="layout-topbar-actions">
                        <li class="topbar-item">
                            <div id="orientation-panel" class="lang-check">
                                <button
                                    class="switch-lang-btn ar"
                                    type="button"
                                    (click)="
                                        appMain.onRTLChange({ checked: true })
                                    "
                                >
                                    <img
                                        src="../../../assets/layout/images/flagLang/sa.svg"
                                    />
                                </button>
                                <button
                                    class="switch-lang-btn en"
                                    type="button"
                                    (click)="
                                        appMain.onRTLChange({ checked: false })
                                    "
                                >
                                    <img
                                        src="../../../assets/layout/images/flagLang/us.svg"
                                    />
                                </button>
                            </div>
                        </li>
                        <li
                            #settings
                            class="topbar-item settings"
                            [ngClass]="{
                                'active-topmenuitem':
                                    appMain.activeTopbarItem === settings
                            }"
                        >
                            <a
                                (click)="
                                    appMain.onTopbarItemClick($event, settings)
                                "
                            >
                                <span class="topbar-icon">
                                    <i class="pi pi-cog"></i>
                                </span>
                            </a>
                            <ul class="fadeInDown">
                                <li class="layout-submenu-header">
                                    <h6 class="header-text">
                                        {{
                                            "configuration.menuModeTitle"
                                                | translate
                                        }}
                                    </h6>
                                </li>
                                <li>
                                    <div
                                        class="flex align-items-center pe-auto"
                                    >
                                        <p-radioButton
                                            name="menuMode"
                                            (ngModelChange)="
                                                ChangeMenuMode($event)
                                            "
                                            value="static"
                                            [(ngModel)]="app.menuMode"
                                            inputId="menuMode1"
                                        ></p-radioButton>
                                        <label for="menuMode1" class="pl-2">{{
                                            "configuration.static" | translate
                                        }}</label>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        class="flex align-items-center pe-auto"
                                    >
                                        <p-radioButton
                                            name="menuMode"
                                            (ngModelChange)="
                                                ChangeMenuMode($event)
                                            "
                                            value="horizontal"
                                            [(ngModel)]="app.menuMode"
                                            inputId="menuMode3"
                                        ></p-radioButton>
                                        <label for="menuMode3" class="pl-2">{{
                                            "configuration.horizontal"
                                                | translate
                                        }}</label>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div
                                class="layout-config-form"
                                id="config-form"
                            ></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
})
export class AppTopBarComponent {
    logoUrl = environment.logoUrl;
    config: AppConfig;
    scales: number[] = [12, 13, 14, 15, 16];

    constructor(
        public appMain: AppMainComponent,
        public app: AppComponent,
        public configService: ConfigService,
        public userService: AuthService,
        private router: Router
    ) {
        this.onLayoutModeChange(null);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href, callback?) {
        if (this.isIE()) {
            linkElement.setAttribute("href", href);
            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute("id");
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute("href", href);
            cloneLinkElement.setAttribute("id", id + "-clone");

            linkElement.parentNode.insertBefore(
                cloneLinkElement,
                linkElement.nextSibling
            );

            cloneLinkElement.addEventListener("load", () => {
                linkElement.remove();
                cloneLinkElement.setAttribute("id", id);

                if (callback) {
                    callback();
                }
            });
        }
    }

    ChangeMenuMode(event) {
        if (event) {
            localStorage.setItem("menuMode", event);
            const SystemConf: SystemConfiguration = {
                id: this.userService.currentUser?.id,
                colorMode: localStorage.getItem("layoutMode"),
                defaultLanguage: localStorage.getItem("lang"),
                menuMode: event,
            };
        }
    }

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        this.appMain.configClick = true;
        event.preventDefault();
    }

    onLayoutModeChange(event) {
        if (localStorage.getItem("layoutMode") === "dark" && event) {
            this.app.layoutMode = "light";
        } else if (
            localStorage.getItem("layoutMode") === "dark" &&
            event == null
        ) {
            this.app.layoutMode = "dark";
        } else if (localStorage.getItem("layoutMode") === "light" && event) {
            this.app.layoutMode = "dark";
        } else if (
            localStorage.getItem("layoutMode") === "light" &&
            event == null
        ) {
            this.app.layoutMode = "light";
        }
        localStorage.setItem("layoutMode", this.app.layoutMode);
        this.app.menuTheme = this.app.layoutMode;
        this.app.topbarTheme = this.app.layoutMode;
        if (event !== null) {
            const SystemConf: SystemConfiguration = {
                id: this.userService.currentUser?.id,
                colorMode: localStorage.getItem("layoutMode"),
                defaultLanguage: localStorage.getItem("lang"),
                menuMode: localStorage.getItem("menuMode"),
            };
        }

        const layoutLink: HTMLLinkElement = document.getElementById(
            "layout-css"
        ) as HTMLLinkElement;
        const layoutHref =
            "assets/layout/css/layout-" + this.app.layoutMode + ".css";
        this.replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById("theme-css");
        const urlTokens = themeLink.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 1] =
            "theme-" + this.app.layoutMode + ".css";
        const newURL = urlTokens.join("/");

        this.replaceLink(
            themeLink,
            newURL,
            this.appMain["refreshTrafficChart"]
        );

        this.configService.updateConfig({
            ...this.config,
            ...{ dark: this.app.layoutMode !== "light" },
        });
    }

    decrementScale() {
        const c = 14;
        let value =c - 6;
        document.documentElement.style.fontSize = `${value}px`;

    }

    incrementScale() {
        const c = 10;
        let value =c + 2;
                document.documentElement.style.fontSize = `${value}px`;
    }

    set scale(_val: any) {
        this.configService.updateConfig(
            this.config
        );
    }

    get scale(): number {
        return this.configService.getConfig().scale;
    }
}
