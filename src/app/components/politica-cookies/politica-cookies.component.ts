import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo.service';
import { IconService } from '../../services/icon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-politica-cookies',
  imports:[
    MatIconModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule
  ],
  templateUrl: './politica-cookies.component.html',
  styleUrls: ['./politica-cookies.component.css']
})
export class PoliticaCookiesComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public icon: IconService, private route: ActivatedRoute){}
  seo = inject(SeoService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seo.removeIndexFollow()
    }
  }

}
