import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]',
  standalone: false
})
export class OnlyNumberDirective {
   private regex: RegExp = /^[0-9]$/;

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
      event.key === 'Control' ||
      event.key === 'Enter'
    ) {
      return;
    }

    // اجازه دادن به Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
      return;
    }

    // جلوگیری از ورود هر چیزی غیر از عدد
    if (!this.regex.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') || '';
    const numeric = pasted.replace(/[^0-9]/g, '');
    const input = this.el.nativeElement as HTMLInputElement;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const current = input.value;

    input.value = current.substring(0, start) + numeric + current.substring(end);
    input.setSelectionRange(start + numeric.length, start + numeric.length);
    input.dispatchEvent(new Event('input'));
  }

  constructor(private el: ElementRef) {}
}
