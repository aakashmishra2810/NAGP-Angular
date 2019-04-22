import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingdetailsComponent } from './onboardingdetails.component';

describe('OnboardingdetailsComponent', () => {
  let component: OnboardingdetailsComponent;
  let fixture: ComponentFixture<OnboardingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
