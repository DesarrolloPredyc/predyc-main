import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhInfoMobileComponent } from './rh-info-mobile.component';

describe('RhInfoMobileComponent', () => {
  let component: RhInfoMobileComponent;
  let fixture: ComponentFixture<RhInfoMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhInfoMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RhInfoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
