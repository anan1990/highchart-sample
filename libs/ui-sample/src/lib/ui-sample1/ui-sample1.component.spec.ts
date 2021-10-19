import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSample1Component } from './ui-sample1.component';

describe('UiSample1Component', () => {
  let component: UiSample1Component;
  let fixture: ComponentFixture<UiSample1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiSample1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
