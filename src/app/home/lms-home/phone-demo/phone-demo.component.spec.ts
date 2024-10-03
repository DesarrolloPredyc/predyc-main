import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneDemoComponent } from './phone-demo.component';

describe('PhoneDemoComponent', () => {
  let component: PhoneDemoComponent;
  let fixture: ComponentFixture<PhoneDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
