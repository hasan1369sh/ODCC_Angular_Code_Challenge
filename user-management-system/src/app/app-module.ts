import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header/header';
import { UsersInfo } from './users-info/users-info';
import { AddUser } from './users-info/add-user-form/add-user';
import { CustomInput } from './public/custom-input/custom-input';
import { CustomSelect } from './public/custom-select/custom-select';
import { DatePicker } from './public/date-picker/date-picker';
import { CustomBtn } from './public/custom-btn/custom-btn';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhotoUpload } from './public/photo-upload/photo-upload';
import { DxDataGridModule } from 'devextreme-angular';
import { OnlyNumberDirective } from './directives/only-number';
import { LettersOnlyDirective } from './directives/only-letter';
@NgModule({
  declarations: [
    App,
    Header,
    UsersInfo,
    AddUser,
    CustomInput,
    CustomSelect,
    DatePicker,
    CustomBtn,
    PhotoUpload,
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
    DxDataGridModule
],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
