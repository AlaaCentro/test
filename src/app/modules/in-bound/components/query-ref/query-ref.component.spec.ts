import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryRefComponent } from './query-ref.component';

describe('QueryRefComponent', () => {
  let component: QueryRefComponent;
  let fixture: ComponentFixture<QueryRefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueryRefComponent]
    });
    fixture = TestBed.createComponent(QueryRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
