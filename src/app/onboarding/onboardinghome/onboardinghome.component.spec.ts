import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardinghomeComponent } from './onboardinghome.component';

describe('OnboardinghomeComponent', () => {
  let component: OnboardinghomeComponent;
  let fixture: ComponentFixture<OnboardinghomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardinghomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardinghomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
