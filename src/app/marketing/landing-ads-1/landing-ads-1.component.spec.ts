import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingAds1Component } from './landing-ads-1.component';

describe('LandingAds1Component', () => {
  let component: LandingAds1Component;
  let fixture: ComponentFixture<LandingAds1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingAds1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingAds1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
