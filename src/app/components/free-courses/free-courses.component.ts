import { Component } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size.service';
import { FreeCoursesDesktopComponent } from './free-courses-desktop/free-courses.component';
import { FreeCoursesMobileComponent } from './free-courses-mobile/free-courses-mobile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-free-courses',
  standalone: true,
  imports: [CommonModule,FreeCoursesDesktopComponent,FreeCoursesMobileComponent],
  templateUrl: './free-courses.component.html',
  styleUrl: './free-courses.component.css'
})
export class freeCoursesComponent {

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
