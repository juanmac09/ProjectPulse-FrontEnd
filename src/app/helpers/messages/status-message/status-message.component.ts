import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './status-message.component.html',
  styleUrl: './status-message.component.css'
})
export class StatusMessageComponent {
  @Input() message: string | null = null;
  @Input() isSuccess: boolean = true;

  close() {
    this.message = null;
  }
}
