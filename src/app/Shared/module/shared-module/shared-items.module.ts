import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "../../components/list/list.component";
import { TableModule } from "primeng/table";
import { AngularSvgIconModule } from "angular-svg-icon";
import { AngularSvgIconPreloaderModule } from "angular-svg-icon-preloader";
import { CheckboxModule } from "primeng/checkbox";
import { MessagesModule } from "primeng/messages";
import { MultiSelectModule } from "primeng/multiselect";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { MessageModule } from "primeng/message";
import { GalleriaModule } from "primeng/galleria";
import { ToastModule } from "primeng/toast";
import { NgxUiLoaderHttpModule, NgxUiLoaderService } from "ngx-ui-loader";
import { EditorModule } from "primeng/editor";
import { AutoCompleteModule } from "primeng/autocomplete";
import { TranslateModule } from "@ngx-translate/core";
import { TabViewModule } from "primeng/tabview";
import { CalendarModule } from "primeng/calendar";
import { ConfirmationService, MessageService } from "primeng/api";
import { PagedListComponent } from "../../components/paged-list/paged-list.component";
import { DebounceClickDirective } from "../../directives/debounce-click-directive";
import { GroupByPipe } from "../../Pipes/group-by.pipe";
import { DynamicSearchService } from "../../services/dynamic-search.service";
import { SplitPipePipe } from "../../Pipes/split-pipe.pipe";
import { ReturnCustomeNamePipePipe } from "../../Pipes/return-custome-name-pipe.pipe";
import { ScrolleListComponent } from "../../components/scrolle-list/scrolle-list.component";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        AngularSvgIconModule.forRoot(),
        AngularSvgIconPreloaderModule.forRoot({
            configUrl: "./assets/icons/icons.json",
        }),
        CheckboxModule,
        FormsModule,
        MessagesModule,
        MultiSelectModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        DropdownModule,
        MessageModule,
        GalleriaModule,
        ToastModule,
        EditorModule,
        NgxUiLoaderHttpModule,
        AutoCompleteModule,
        TranslateModule,
        TabViewModule,
        CalendarModule,
        VirtualScrollerModule,
        TooltipModule
    ],
    declarations: [
        ListComponent,
        PagedListComponent,
        DebounceClickDirective,
        GroupByPipe,
        SplitPipePipe,
        ReturnCustomeNamePipePipe,
        ScrolleListComponent
    ],
    exports: [
        ListComponent,
        PagedListComponent,
        DebounceClickDirective,
        GroupByPipe,
        SplitPipePipe,
        ReturnCustomeNamePipePipe,
        ScrolleListComponent
    ],
    providers: [
        MessageService,
        NgxUiLoaderService,
        ConfirmationService,
        DynamicSearchService,
    ],
})
export class SharedItemsModule {}
