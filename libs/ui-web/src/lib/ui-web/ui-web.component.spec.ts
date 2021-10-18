import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiWebComponent } from './ui-web.component';

describe('UiWebComponent', () => {
  let component: UiWebComponent;
  let fixture: ComponentFixture<UiWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
