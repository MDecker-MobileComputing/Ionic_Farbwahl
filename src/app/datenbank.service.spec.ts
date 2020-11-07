import { TestBed } from '@angular/core/testing';

import { DatenbankService } from './datenbank.service';

describe('DatenbankService', () => {
  let service: DatenbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatenbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
