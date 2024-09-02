import { TestBed } from '@angular/core/testing';

import { CreateUserStoryService } from './create-user-story.service';

describe('CreateUserStoryService', () => {
  let service: CreateUserStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUserStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
