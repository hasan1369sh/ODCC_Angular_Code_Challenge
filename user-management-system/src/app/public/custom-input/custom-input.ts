import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: false,
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true
    }
  ]
})
export class CustomInput implements ControlValueAccessor { // اضافه کردن implements

  @Input() label: string = '';
  @Input() isRequired: boolean = true;
  @Input() disabled: boolean = false;
  @Input() width: string = '100%';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  value: string = '';

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value || '';
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

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
  }
}
