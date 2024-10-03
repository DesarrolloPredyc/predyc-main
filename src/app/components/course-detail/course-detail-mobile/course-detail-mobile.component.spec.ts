import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailMobileComponent } from './course-detail-mobile.component';

describe('CourseDetailMobileComponent', () => {
  let component: CourseDetailMobileComponent;
  let fixture: ComponentFixture<CourseDetailMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseDetailMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
