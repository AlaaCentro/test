import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppAccessdeniedComponent } from './components/app-accessdenied/app-accessdenied.component';
import { ButtonModule } from 'primeng/button';




@NgModule({
    declarations: [
        LoginComponent,
        AppAccessdeniedComponent
    ],
    imports: [
        AngularSvgIconModule.forRoot(), // angular-svg-icon library module
        AngularSvgIconPreloaderModule.forRoot({
            configUrl: './assets/icons/icons.json',
        }),
        CommonModule,
        AuthRoutingModule, PasswordModule, ProgressBarModule,ButtonModule,
        FormsModule, ReactiveFormsModule,
        TranslateModule, MessagesModule, SelectButtonModule, ProgressBarModule, ProgressSpinnerModule,
        MessageModule, GalleriaModule, ToastModule, NgxUiLoaderModule, TranslateModule, InputSwitchModule
    ],
    providers: [MessageService, NgxUiLoaderService]

})
export class AuthModule { }
