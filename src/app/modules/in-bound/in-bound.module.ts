import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InBoundRoutingModule } from "./in-bound-routing.module";
import {
    NgxUiLoaderConfig,
    NgxUiLoaderHttpModule,
    NgxUiLoaderModule,
    NgxUiLoaderService,
} from "ngx-ui-loader";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { AngularSvgIconPreloaderModule } from "angular-svg-icon-preloader";
import { MessageService, ConfirmationService } from "primeng/api";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { MultiSelectModule } from "primeng/multiselect";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { TooltipModule } from "primeng/tooltip";
import { SharedItemsModule } from "src/app/Shared/module/shared-module/shared-items.module";
import { MainInPageComponent } from "./components/main-in-page/main-in-page.component";
import { ChartModule } from "primeng/chart";
import { VoiceInfoComponent } from "./components/voice-info/voice-info.component";
import { ActionComponent } from "./components/action/action.component";
import { AttachImageComponent } from "./components/attach-image/attach-image.component";
import { HistoryComponent } from "./components/history/history.component";
import { ServiceComponent } from "./components/service/service.component";
import { ComponsationComponent } from "./components/componsation/componsation.component";
import { PendingCloseComponent } from "./components/pending-close/pending-close.component";
import { QueryRefComponent } from "./components/query-ref/query-ref.component";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from "primeng/radiobutton";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from 'primeng/dialog';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: 'var("--primary-green-color")',
    bgsOpacity: 0.5,
    bgsPosition: "bottom-right",
    bgsSize: 60,
    bgsType: "ball-spin-clockwise",
    blur: 5,
    delay: 0,
    fastFadeOut: true,
    fgsColor: 'var("--primary-green-color")',
    fgsPosition: "center-center",
    fgsSize: 60,
    fgsType: "three-strings",
    gap: 24,
    logoPosition: "center-center",
    logoSize: 120,
    logoUrl: "",
    masterLoaderId: "master",
    overlayBorderRadius: "0",
    overlayColor: "rgba(0, 0, 0, 0.5)",
    pbColor: 'var("--primary-color")',
    pbDirection: "ltr",
    pbThickness: 3,
    hasProgressBar: true,
    text: "Loading...",
    textColor: "#00acc1",
    textPosition: "center-center",
    maxTime: -1,
    minTime: 0,
};

@NgModule({
    declarations: [
        MainInPageComponent,
        VoiceInfoComponent,
        ActionComponent,
        AttachImageComponent,
        HistoryComponent,
        ServiceComponent,
        ComponsationComponent,
        PendingCloseComponent,
        QueryRefComponent,
    ],
    imports: [
        InBoundRoutingModule,
        AngularSvgIconModule.forRoot(),
        AngularSvgIconPreloaderModule.forRoot({
            configUrl: "./assets/icons/icons.json",
        }),
        ToggleButtonModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MessageModule,
        SharedItemsModule,
        RadioButtonModule,
        ButtonModule,
        TableModule,
        CheckboxModule,
        InputTextModule,
        MessagesModule,
        MultiSelectModule,
        InputTextareaModule,
        InputNumberModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
        DropdownModule,
        ToastModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderHttpModule,
        AutoCompleteModule,
        TranslateModule,
        TabViewModule,
        CalendarModule,
        TooltipModule,
        ChartModule,
        SharedItemsModule,
        RadioButtonModule,
        FileUploadModule,
        DialogModule
    ],
    providers: [MessageService, NgxUiLoaderService, ConfirmationService],
})
export class InBoundModule {}
