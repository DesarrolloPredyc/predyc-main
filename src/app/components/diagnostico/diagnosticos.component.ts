import { Component } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size.service';
import { diagnosticosDesktopComponent } from './diagnosticos-desktop/diagnosticos.component';
import { CommonModule } from '@angular/common';
import { diagnosticosMobileComponent } from './diagnosticos-mobile/diagnosticos-mobile.component';

@Component({
  selector: 'app-diagnosticos',
  standalone: true,
  imports: [CommonModule,diagnosticosDesktopComponent,diagnosticosMobileComponent],
  templateUrl: './diagnosticos.component.html',
  styleUrl: './diagnosticos.component.css'
})
export class diagnosticosComponent {

  isMobile: boolean = false;
  loaded: boolean = false;

  constructor(private screenSizeService: ScreenSizeService) {}

  ngOnInit() {
    this.screenSizeService.screenSize$.subscribe(size => {
      this.isMobile = size === 'mobile';
      this.loaded = true;
    });
  }

}
