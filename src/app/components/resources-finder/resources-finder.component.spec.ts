import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesFinderComponent } from './resources-finder.component';

describe('ResourcesFinderComponent', () => {
  let component: ResourcesFinderComponent;
  let fixture: ComponentFixture<ResourcesFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesFinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourcesFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
