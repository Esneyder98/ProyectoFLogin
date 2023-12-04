import { Injectable } from '@angular/core';
import { jsPDF} from "jspdf"
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ReportPdfService {

  constructor() { }

  generatePDF(){
    const element:any = document.getElementById('pdfContent');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getHeight();
      const pdfHeight = (imgProps.height * pdfWidth)/ imgProps.width;

      pdf.addImage(imgData, 'PNG',0,0,pdfWidth, pdfHeight);
      pdf.save('report.pdf')
    })
  }
}
