import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGeneratorComponent } from './plan-generator.component';

describe('PlanGeneratorComponent', () => {
  let component: PlanGeneratorComponent;
  let fixture: ComponentFixture<PlanGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
