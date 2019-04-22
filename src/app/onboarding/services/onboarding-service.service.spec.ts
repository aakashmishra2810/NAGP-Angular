import { TestBed } from '@angular/core/testing';

import { OnboardingServiceService } from './onboarding-service.service';

describe('OnboardingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnboardingServiceService = TestBed.get(OnboardingServiceService);
    expect(service).toBeTruthy();
  });
});
