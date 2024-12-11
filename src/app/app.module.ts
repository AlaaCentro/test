import { InputSwitchModule } from "primeng/inputswitch";
import { AuthInterceptor } from "./Shared/interceptor/auth.interceptor";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import {
    DatePipe,
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy,
} from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { ButtonModule } from "primeng/button";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { MenuModule } from "primeng/menu";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { SplitButtonModule } from "primeng/splitbutton";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { AppComponent } from "./app.component";
import { DashboardDemoComponent } from "./demo/view/dashboarddemo.component";
import { ConfigService } from "./demo/service/app.config.service";
import { AppMainComponent } from "./Shared/components/app.main.component";
import { AppMenuComponent } from "./Shared/components/app.menu.component";
import { AppMenuitemComponent } from "./Shared/components/app.menuitem.component";
import { AppBreadcrumbComponent } from "./Shared/components/app.breadcrumb.component";
import { AppTopBarComponent } from "./Shared/components/app.topbar.component";
import { AppFooterComponent } from "./Shared/components/app.footer.component";
import { MenuService } from "./Shared/services/app.menu.service";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AngularSvgIconModule } from "angular-svg-icon";
import { AngularSvgIconPreloaderModule } from "angular-svg-icon-preloader";
import { ErrorHandlerInterceptor } from "./Shared/interceptor/error-handler.interceptor";
import { MessageService } from "primeng/api";
import { CountryService } from "./demo/service/countryservice";
import { EventService } from "./demo/service/eventservice";
import { IconService } from "./demo/service/iconservice";
import { NodeService } from "./demo/service/nodeservice";
import { PhotoService } from "./demo/service/photoservice";
import { AppBreadcrumbService } from "./Shared/services/app.breadcrumb.service";
import { PendingChangesGuard } from "./Shared/guards/pending-changes-guard";
import { PasswordModule } from "primeng/password";
import { SelectButtonModule } from "primeng/selectbutton";


@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
        }),
        AngularSvgIconModule.forRoot(), // angular-svg-icon library module
        AngularSvgIconPreloaderModule.forRoot({
            configUrl: "./assets/icons/icons.json",
        }),
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        SelectButtonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ButtonModule,
        ChartModule,
        CheckboxModule,
        DropdownModule,
        InputSwitchModule,
        MenuModule,
        MessageModule,
        MessagesModule,
        MenuModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        TableModule,
        ToolbarModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        PasswordModule,
        SplitButtonModule,
        SplitButtonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppBreadcrumbComponent,
        AppTopBarComponent,
        AppFooterComponent,
        DashboardDemoComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        },
        DatePipe,
        MessageService,
        CountryService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        MenuService,
        AppBreadcrumbService,
        ConfigService,
        PendingChangesGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
