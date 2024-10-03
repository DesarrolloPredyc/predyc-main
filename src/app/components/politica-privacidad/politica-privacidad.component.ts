import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '../../services/icon.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  standalone: true,
  imports:[
    MatIconModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule
  ],
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.component.html',
  styleUrls: ['./politica-privacidad.component.css']
})
export class PoliticaPrivacidadComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public icon: IconService, private route: ActivatedRoute){}
  seo = inject(SeoService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seo.removeIndexFollow()
    }
  }

}
