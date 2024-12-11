import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrolleListComponent } from './scrolle-list.component';

describe('ScrolleListComponent', () => {
  let component: ScrolleListComponent;
  let fixture: ComponentFixture<ScrolleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrolleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrolleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
