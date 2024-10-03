import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { IconService } from '../../../services/icon.service';

@Component({
  standalone: true,
  imports:[
    MatIconModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
  selector: 'app-plan-anual',
  templateUrl: './plan-anual.component.html',
  styleUrls: ['./plan-anual.component.css']
})
export class PlanAnualComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public icon: IconService, private route: ActivatedRoute){}
  seo = inject(SeoService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seo.removeIndexFollow()
    }
  }

}