import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photo-upload',
  standalone: false,
  templateUrl: './photo-upload.html',
  styleUrl: './photo-upload.css',
})
export class PhotoUpload {
  @Input() profilePhoto: string = '';
  @Output() profilePhotoChange = new EventEmitter<string>();
  @Input() disabled: boolean = false;
  @Input() name: string = '';

  selectedFile: File | null = null;

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  onFileSelected(event: Event): void {
    event.stopPropagation();
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file: File = input.files[0];

      if (!file.type.match('image.*')) {
        Swal.fire({
          text: 'لطفاً فقط فایل تصویری انتخاب کنید',
          icon: 'warning',
          confirmButtonText: 'تایید'
        });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          text: ' حجم فایل باید کمتر از 2 مگابایت باشد',
          icon: 'warning',
          confirmButtonText: 'تایید'
        });

        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = reader.result as string;
        this.profilePhoto = base64String;
        this.profilePhotoChange.emit(base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.profilePhoto = '';
    this.selectedFile = null;
    this.profilePhotoChange.emit('');
  }

  triggerFileInput(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
}
