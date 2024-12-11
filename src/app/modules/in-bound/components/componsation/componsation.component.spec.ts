import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponsationComponent } from './componsation.component';

describe('ComponsationComponent', () => {
  let component: ComponsationComponent;
  let fixture: ComponentFixture<ComponsationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponsationComponent]
    });
    fixture = TestBed.createComponent(ComponsationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
