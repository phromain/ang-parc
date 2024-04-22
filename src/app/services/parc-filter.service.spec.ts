import { TestBed } from '@angular/core/testing';

import { ParcFilterService } from './parc-filter.service';

describe('ParcFilterService', () => {
  let service: ParcFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
