import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTiketsComponent } from './create-tikets.component';

describe('CreateTiketsComponent', () => {
  let component: CreateTiketsComponent;
  let fixture: ComponentFixture<CreateTiketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTiketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTiketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
