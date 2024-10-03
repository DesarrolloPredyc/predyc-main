import { Component } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size.service';
import { BlogDesktopComponent } from './blog-desktop/blog.component';
import { BlogMobileComponent } from './blog-mobile/blog-mobile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,BlogDesktopComponent,BlogMobileComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

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
