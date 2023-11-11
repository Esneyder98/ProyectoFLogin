import { TestBed } from '@angular/core/testing';

import { PerfilDataService } from './perfil-data.service';

describe('PerfilDataService', () => {
  let service: PerfilDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
