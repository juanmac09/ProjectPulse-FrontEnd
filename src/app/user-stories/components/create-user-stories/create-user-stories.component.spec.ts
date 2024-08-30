import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserStoriesComponent } from './create-user-stories.component';

describe('CreateUserStoriesComponent', () => {
  let component: CreateUserStoriesComponent;
  let fixture: ComponentFixture<CreateUserStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
