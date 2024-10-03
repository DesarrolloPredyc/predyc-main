import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesLogoComponent } from './profiles-logo.component';

describe('ProfilesLogoComponent', () => {
  let component: ProfilesLogoComponent;
  let fixture: ComponentFixture<ProfilesLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilesLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilesLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
