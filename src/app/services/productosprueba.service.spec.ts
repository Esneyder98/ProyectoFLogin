import { TestBed } from '@angular/core/testing';

import { ProductospruebaService } from './productosprueba.service';

describe('ProductospruebaService', () => {
  let service: ProductospruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductospruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
