import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPlanComponent } from './student-plan.component';

describe('StudentPlanComponent', () => {
  let component: StudentPlanComponent;
  let fixture: ComponentFixture<StudentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
