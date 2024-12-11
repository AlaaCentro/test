import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceInfoComponent } from './voice-info.component';

describe('VoiceInfoComponent', () => {
  let component: VoiceInfoComponent;
  let fixture: ComponentFixture<VoiceInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoiceInfoComponent]
    });
    fixture = TestBed.createComponent(VoiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
