import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportPdfComponent } from './product-report-pdf.component';

describe('ProductReportPdfComponent', () => {
  let component: ProductReportPdfComponent;
  let fixture: ComponentFixture<ProductReportPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductReportPdfComponent]
    });
    fixture = TestBed.createComponent(ProductReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
