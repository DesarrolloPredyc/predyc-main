import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IconService } from '../../../services/icon.service';
import { SeoService } from '../../../services/seo.service';

@Component({
  standalone: true,
  imports:[
    MatIconModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
  selector: 'app-curso-individual',
  templateUrl: './curso-individual.component.html',
  styleUrls: ['./curso-individual.component.css']
})
export class CursoIndividualComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public icon: IconService, private route: ActivatedRoute){}
  seo = inject(SeoService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seo.removeIndexFollow()
    }
  }

}