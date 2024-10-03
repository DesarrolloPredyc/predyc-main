import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGeneratorMobileComponent } from './plan-generator-mobile.component';

describe('PlanGeneratorMobileComponent', () => {
  let component: PlanGeneratorMobileComponent;
  let fixture: ComponentFixture<PlanGeneratorMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGeneratorMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanGeneratorMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
