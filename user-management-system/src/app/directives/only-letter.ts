// directives/letters-only-simple.directive.ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLettersOnly]',
  standalone: false
})
export class LettersOnlyDirective {

 private readonly persianLetters = /[\u0600-\u06FF\uFB8A\u067E\u0686\u0698\u06AF]/;
  private readonly englishLetters = /^[a-zA-Z]$/;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // اجازه دادن به کلیدهای کنترلی
    if (
      event.key === 'Backspace' ||
      event.key === 'Tab' ||
      event.key === 'End' ||
      event.key === 'Home' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'Delete' ||
      event.key === 'Enter'
    ) {
      return;
    }

    // اجازه دادن به Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X (و Command در مک)
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    if (isCtrlOrCmd && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
      return;
    }

    // بررسی: آیا کلید فشرده‌شده یک حرف انگلیسی یا فارسی است؟
    const char = event.key;

    // حرف انگلیسی؟
    if (this.englishLetters.test(char)) {
      return;
    }

    // حرف فارسی؟ (با بررسی کد یونیکد)
    if (this.persianLetters.test(char)) {
      return;
    }

    // هر چیز دیگری مسدود شود
    event.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') || '';

    // حذف هر چیزی جز حروف فارسی و انگلیسی
    const lettersOnly = pasted.replace(/[^a-zA-Z\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\s]/g, '');

    const input = this.el.nativeElement as HTMLInputElement;
    const start = input.selectionStart || 0;
    const end = input.selectionStart || 0;
    const current = input.value;

    input.value = current.substring(0, start) + lettersOnly + current.substring(end);
    input.setSelectionRange(start + lettersOnly.length, start + lettersOnly.length);
    input.dispatchEvent(new Event('input'));
  }

  constructor(private el: ElementRef) {}
}
