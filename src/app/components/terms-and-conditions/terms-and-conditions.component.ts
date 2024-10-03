import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Importa RouterModule
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '../../services/icon.service';
import { SeoService } from '../../services/seo.service';


@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, FlexLayoutServerModule, MatIconModule,RouterModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css'
})
export class TermsAndConditionsComponent {


  constructor(@Inject(PLATFORM_ID) private platformId: Object, public icon: IconService, private route: ActivatedRoute){}
  seo = inject(SeoService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seo.removeIndexFollow()
    }
  }

}
