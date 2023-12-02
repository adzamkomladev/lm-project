import { TestBed } from '@angular/core/testing';

import { PackageSetupService } from './package-setup.service';

describe('PackageSetupService', () => {
  let service: PackageSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
