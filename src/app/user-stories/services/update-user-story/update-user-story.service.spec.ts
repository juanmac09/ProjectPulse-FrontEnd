import { TestBed } from '@angular/core/testing';

import { UpdateUserStoryService } from './update-user-story.service';

describe('UpdateUserStoryService', () => {
  let service: UpdateUserStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUserStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
