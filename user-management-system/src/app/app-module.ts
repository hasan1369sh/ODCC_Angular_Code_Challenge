import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header/header';
import { UsersInfo } from './users-info/users-info';
import { DatePicker } from './public/date-picker/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxPopupComponent, DxTextBoxComponent, DxDateBoxComponent, DxSelectBoxComponent, DxFileUploaderComponent, DxButtonComponent, DxValidatorComponent } from 'devextreme-angular';
import { OnlyNumberDirective } from './directives/only-number';
import { LettersOnlyDirective } from './directives/only-letter';
import { DxiPopupToolbarItemComponent } from "devextreme-angular/ui/popup";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@NgModule({
  declarations: [
    App,
    Header,
    UsersInfo,
    DatePicker,
    OnlyNumberDirective,
    LettersOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgPersianDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    DxDataGridModule,
    DxPopupComponent,
    DxiPopupToolbarItemComponent,
    DxTextBoxComponent,
    DxDateBoxComponent,
    DxSelectBoxComponent,
    DxFileUploaderComponent,
    DxButtonComponent,
    DxValidatorComponent
],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
