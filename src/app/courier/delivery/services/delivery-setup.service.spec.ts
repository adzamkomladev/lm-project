import { TestBed } from '@angular/core/testing';

import { DeliverySetupService } from './delivery-setup.service';

describe('DeliverySetupService', () => {
  let service: DeliverySetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverySetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
