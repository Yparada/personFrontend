import { TestBed } from '@angular/core/testing';

import { PersonasInterceptorService } from './personas-interceptor.service';

describe('PersonasInterceptorService', () => {
  let service: PersonasInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
