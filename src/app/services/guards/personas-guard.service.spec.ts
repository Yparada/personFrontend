import { TestBed } from '@angular/core/testing';

import { PersonasGuardService } from './personas-guard.service';

describe('PersonasGuardService', () => {
  let service: PersonasGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
