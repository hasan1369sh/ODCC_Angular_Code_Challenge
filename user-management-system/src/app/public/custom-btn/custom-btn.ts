import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-btn',
  standalone: false,
  templateUrl: './custom-btn.html',
  styleUrl: './custom-btn.css'
})
export class CustomBtn {

  @Input() hasIcon: boolean = false;
  @Input() disabled: boolean = false;
  @Input() text: string = 'ذخیره';
  @Input() backgroundColor: string = 'rgb(17, 109, 248)';
  @Input() textColor: string = 'white';
  @Input() border: string = 'none';
}
