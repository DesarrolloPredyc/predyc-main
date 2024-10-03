import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesHomeMobileComponent } from './courses-home-mobile.component';

describe('CoursesHomeMobileComponent', () => {
  let component: CoursesHomeMobileComponent;
  let fixture: ComponentFixture<CoursesHomeMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesHomeMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesHomeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
