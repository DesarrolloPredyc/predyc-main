import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailDesktopComponent } from './course-detail-desktop.component';

describe('CourseDetailDesktopComponent', () => {
  let component: CourseDetailDesktopComponent;
  let fixture: ComponentFixture<CourseDetailDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailDesktopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseDetailDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
