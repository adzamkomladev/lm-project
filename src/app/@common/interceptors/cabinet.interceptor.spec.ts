import { TestBed } from '@angular/core/testing';

import { CabinetInterceptor } from './cabinet.interceptor';

describe('CabinetInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CabinetInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CabinetInterceptor = TestBed.inject(CabinetInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
