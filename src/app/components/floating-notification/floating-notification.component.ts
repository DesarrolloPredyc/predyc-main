import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-floating-notification',
  standalone: true,
  imports:[MatProgressSpinnerModule],
  templateUrl: './floating-notification.component.html',
  styleUrls: ['./floating-notification.component.css']
})
export class FloatingNotificationComponent {
  @Input() message: string;
  
}