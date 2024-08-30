import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTiketsComponent } from './update-tikets.component';

describe('UpdateTiketsComponent', () => {
  let component: UpdateTiketsComponent;
  let fixture: ComponentFixture<UpdateTiketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTiketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTiketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
