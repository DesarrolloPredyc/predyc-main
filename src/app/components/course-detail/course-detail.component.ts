import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size.service';
import { CourseDetailDesktopComponent } from './course-detail-desktop/course-detail-desktop.component';
import { CourseDetailMobileComponent } from './course-detail-mobile/course-detail-mobile.component';
import { CommonModule } from '@angular/common';
import { IconService } from '../../services/icon.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  templateUrl: './course-detail.component.html',
  imports: [CommonModule,CourseDetailDesktopComponent, CourseDetailMobileComponent, FooterComponent],
  providers:[IconService],
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  isMobile: boolean = false;
  loaded: boolean = false;

  constructor(private screenSizeService: ScreenSizeService,
  ) {}

  ngOnInit() {

    this.screenSizeService.screenSize$.subscribe(size => {
      this.isMobile = size === 'mobile';
      this.loaded = true;
    });
  }

}
