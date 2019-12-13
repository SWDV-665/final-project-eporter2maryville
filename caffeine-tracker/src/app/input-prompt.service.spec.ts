import { TestBed } from '@angular/core/testing';

import { InputPromptService } from './input-prompt.service';

describe('InputPromptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputPromptService = TestBed.get(InputPromptService);
    expect(service).toBeTruthy();
  });
});
