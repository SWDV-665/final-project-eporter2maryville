import { TestBed } from '@angular/core/testing';

import { CaffeineLogChangeService } from './caffeine-log-change.service';

describe('CaffeineLogChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaffeineLogChangeService = TestBed.get(CaffeineLogChangeService);
    expect(service).toBeTruthy();
  });
});
