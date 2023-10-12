import { TestBed } from '@angular/core/testing';

import { ShinobiService } from './shinobi.service';

describe('ShinobiService', () => {
  let service: ShinobiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShinobiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
