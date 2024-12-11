import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAccessdeniedComponent } from './app-accessdenied.component';

describe('AppAccessdeniedComponent', () => {
  let component: AppAccessdeniedComponent;
  let fixture: ComponentFixture<AppAccessdeniedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppAccessdeniedComponent]
    });
    fixture = TestBed.createComponent(AppAccessdeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
