import { TestBed } from '@angular/core/testing';

import { NeighborhoodCenterService } from './neighborhood-center.service';

describe('NeighborhoodCenterService', () => {
  let service: NeighborhoodCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeighborhoodCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
