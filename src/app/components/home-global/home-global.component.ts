import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { HomeMobileComponent } from '../home-mobile/home-mobile.component';
import { ScreenSizeService } from '../../services/screen-size.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-global',
  standalone: true,
  imports: [CommonModule,HomeComponent,HomeMobileComponent], 
  providers:[],
  templateUrl: './home-global.component.html',
  styleUrls: ['./home-global.component.css']
})
export class HomeComponentGlobalComponent implements OnInit{

  constructor(
    private screenSizeService: ScreenSizeService,
    @Inject(PLATFORM_ID) private platform: Object,
  ) {
    this.isDesktop = false;
  }

  // seo = inject(SeoService);
  isDesktop = false
  loaded = false

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      const width = window.innerWidth;
      if (width >= 768) {
        this.isDesktop = true
      } else {
        this.isDesktop = false
      }
      //console.log('width',width)
      this.loaded = true
      this.screenSizeService.screenSize$.subscribe(size => {
        this.isDesktop = size === 'desktop';
        this.loaded = true
      });
    }
  }

  // ngOnInit(): void {
  //   this.screenSizeService.screenSize$.subscribe(size => {
  //     this.isDesktop = size === 'desktop';
  //     this.loaded = true

  //   });
  // }

  ngOnDestroy() {

  }


}