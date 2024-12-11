import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCloseComponent } from './pending-close.component';

describe('PendingCloseComponent', () => {
  let component: PendingCloseComponent;
  let fixture: ComponentFixture<PendingCloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingCloseComponent]
    });
    fixture = TestBed.createComponent(PendingCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
