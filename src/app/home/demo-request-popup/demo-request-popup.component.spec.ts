import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoRequestPopupComponent } from './demo-request-popup.component';

describe('DemoRequestPopupComponent', () => {
  let component: DemoRequestPopupComponent;
  let fixture: ComponentFixture<DemoRequestPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoRequestPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoRequestPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
