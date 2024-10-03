import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPricingComponent } from './cards-pricing.component';

describe('CardsPricingComponent', () => {
  let component: CardsPricingComponent;
  let fixture: ComponentFixture<CardsPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsPricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
