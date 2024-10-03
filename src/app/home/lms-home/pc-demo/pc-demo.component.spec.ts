import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcDemoComponent } from './pc-demo.component';

describe('PcDemoComponent', () => {
  let component: PcDemoComponent;
  let fixture: ComponentFixture<PcDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PcDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PcDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
