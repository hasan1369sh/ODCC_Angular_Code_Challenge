import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { defaultTheme, IActiveDate, IDatepickerTheme } from 'ng-persian-datepicker';

@Component({
  selector: 'app-date-picker',
  standalone: false,
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true
    }
  ]
})
export class DatePicker implements ControlValueAccessor {

  dateValue = new FormControl(new Date().valueOf());

  @Input() label: string = '';
  @Input() placeholder: string = 'YYYY/MM/DD';
  @Input() name: string = '';
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<any>();

  uiIsVisible: boolean = false;
  uiTheme: IDatepickerTheme = defaultTheme;
  uiYearView: boolean = true;
  uiMonthView: boolean = true;
  uiHideAfterSelectDate: boolean = true;
  uiHideOnOutsideClick: boolean = true;
  uiTodayBtnEnable: boolean = true;

  timeEnable: boolean = false;
  timeShowSecond: boolean = false;
  timeMeridian: boolean = false;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.dateValue.setValue(value);
    } else {
      this.dateValue.setValue(null);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.dateValue.disable();
    } else {
      this.dateValue.enable();
    }
  }

  onSelect(date: IActiveDate) {
    console.log('Selected date:', date);
    this.onChange(date);
    this.onTouched();

    this.valueChange.emit(date);
  }

  getCurrentValue(): any {
    return this.dateValue.value;
  }
}
