import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsMobileComponent } from './programs-mobile.component';

describe('ProgramsMobileComponent', () => {
  let component: ProgramsMobileComponent;
  let fixture: ComponentFixture<ProgramsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramsMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
