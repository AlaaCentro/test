import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInPageComponent } from './main-in-page.component';

describe('MainInPageComponent', () => {
  let component: MainInPageComponent;
  let fixture: ComponentFixture<MainInPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainInPageComponent]
    });
    fixture = TestBed.createComponent(MainInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
