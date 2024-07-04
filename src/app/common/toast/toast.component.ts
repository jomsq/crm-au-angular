import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  show = false;
  message = '';
  title = '';
  type: 'success' | 'error' = 'success';

  showToast(title: string, message: string, type: 'success' | 'error' = 'success') {
    this.title = title;
    this.message = message;
    this.type = type;
    this.show = true;
    setTimeout(() => this.hideToast(), 3000); // Auto hide after 3 seconds
  }

  hideToast() {
    this.show = false;
  }
}
