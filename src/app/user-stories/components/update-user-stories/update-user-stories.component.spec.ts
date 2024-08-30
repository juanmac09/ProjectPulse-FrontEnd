import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserStoriesComponent } from './update-user-stories.component';

describe('UpdateUserStoriesComponent', () => {
  let component: UpdateUserStoriesComponent;
  let fixture: ComponentFixture<UpdateUserStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
