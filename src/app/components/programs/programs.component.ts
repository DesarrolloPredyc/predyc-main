import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size.service';
import { ProgramsMobileComponent } from './programs-mobile/programs-mobile.component';
import { ProgramsDesktopComponent } from './programs-desktop/programs-desktop.component';
import { IconService } from '../../services/icon.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { SeoService } from '../../services/seo.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [ProgramsDesktopComponent, ProgramsMobileComponent, FooterComponent, CommonModule  ],
  providers:[IconService],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent implements OnInit {

  isMobile: boolean = false;
  loaded: boolean = false;

  constructor(private screenSizeService: ScreenSizeService,  @Inject(PLATFORM_ID) private platform: Object,
  private route: ActivatedRoute,

) {}

seo = inject(SeoService)
  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      let url = routeParams.id
    });
    this.screenSizeService.screenSize$.subscribe(size => {
      this.isMobile = size === 'mobile';
      this.loaded = true;
    });
  }

}
