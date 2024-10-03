import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcDemoComponent } from './pc-demo/pc-demo.component';
import { PhoneDemoComponent } from './phone-demo/phone-demo.component';
import { IconService } from '../../services/icon.service';



@Component({
  selector: 'app-lms-home',
  standalone: true,
  imports: [CommonModule, PcDemoComponent, PhoneDemoComponent],
  providers:[IconService],
  templateUrl: './lms-home.component.html',
  styleUrls: ['./lms-home.component.css']
})
export class LmsHomeComponent {
  isPcView: boolean = true;

  toggleView(): void {
    this.isPcView = !this.isPcView;
  }
}