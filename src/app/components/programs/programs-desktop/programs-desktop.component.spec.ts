import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsDesktopComponent } from './programs-desktop.component';

describe('ProgramsDesktopComponent', () => {
  let component: ProgramsDesktopComponent;
  let fixture: ComponentFixture<ProgramsDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramsDesktopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
