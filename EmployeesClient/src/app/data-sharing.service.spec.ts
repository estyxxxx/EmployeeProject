import { TestBed } from '@angular/core/testing';

import { DataSharingService } from './services/data-sharing.service';

describe('DataSharingService', () => {
  let service: DataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
