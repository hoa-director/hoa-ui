import { TestBed } from '@angular/core/testing';

import { UsersCenterService } from './users-center.service';

describe('UsersCenterService', () => {
  let service: UsersCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
