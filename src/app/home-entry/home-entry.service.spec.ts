import { TestBed } from '@angular/core/testing';

import { HomeEntryService } from './home-entry.service';

describe('HomeEntryService', () => {
  let service: HomeEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
