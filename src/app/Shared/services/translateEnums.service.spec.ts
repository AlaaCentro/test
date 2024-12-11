/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TranslateEnumsService } from './translateEnums.service';

describe('Service: TranslateEnums', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateEnumsService]
    });
  });

  it('should ...', inject([TranslateEnumsService], (service: TranslateEnumsService) => {
    expect(service).toBeTruthy();
  }));
});
