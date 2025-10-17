import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBtn } from './custom-btn';

describe('CustomBtn', () => {
  let component: CustomBtn;
  let fixture: ComponentFixture<CustomBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
