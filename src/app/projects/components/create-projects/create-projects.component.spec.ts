import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectsComponent } from './create-projects.component';

describe('CreateProjectsComponent', () => {
  let component: CreateProjectsComponent;
  let fixture: ComponentFixture<CreateProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
