import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: false,
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelect),
      multi: true
    }
  ]
})
export class CustomSelect implements ControlValueAccessor {

  @Input() name: string = '';
  @Input() options: any[] = [];
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = true;
  @Input() width: string = '100%';
  @Input() optionValue: string = 'key';
  @Input() optionDisplay: string = 'value';

  @Output() selectedValueChange = new EventEmitter<any>();

  value: any = null;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event: any) {
    const selectedKey = event.target.value;
    const selectedOption = this.options.find(option =>
      String(option[this.optionValue]) === String(selectedKey)
    );

    this.value = selectedOption;
    this.onChange(selectedOption);
    this.onTouched();
    this.selectedValueChange.emit(selectedOption);
  }

  getSelectedKey(): any {
    if (!this.value) return '';
    if (typeof this.value === 'object' && this.value !== null) {
      return this.value[this.optionValue];
    }

    return this.value;
  }

  getDisplayValue(option: any): string {
    return option[this.optionDisplay];
  }

  getOptionValue(option: any): any {
    return option[this.optionValue];
  }
}
