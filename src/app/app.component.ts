import { Component, signal } from '@angular/core';
import { GeneralService } from './service/general.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private fileName!: string;
  private fileContent!: string;
  processedData!: any;
  numericalProcessedData: any = [];
  categoricalProcessedData: any = [];
  cardsData: { name: string; value: any }[] = [];
  header = false;

  constructor(private service: GeneralService) {}

  async onSubmit(fileUploadForm: any) {
    this.clearUpload();
    this.processedData = await this.service.processData(
      this.fileContent,
      fileUploadForm.value.hasHeader
    );
    this.cardsData.push(
      { name: 'No. of Rows', value: this.processedData.data.length },
      { name: 'No. of Column', value: this.processedData.data[0]?.length }
    );
    const typeValue = this.checkCategoricalNumerical();
    this.cardsData.push(
      { name: 'Numerical Column', value: typeValue[0] },
      { name: 'Categorical Column', value: typeValue[1] }
    );
  }

  async uploadFile(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file?.name;
    this.fileContent = await file.text();
  }

  checkCategoricalNumerical() {
    let last = this.processedData.data[0].length - 1;
    console.log(last);
    let categoricalCount = 0,
      numericalCount = 0;
    for (const value in this.processedData.data[0]) {
      if (
        Number(this.processedData.data[0][value]) ||
        Number(this.processedData.data[0][value]) === 0
      ) {
        numericalCount++;
        this.pushDataIntoTypes(
          'numerical',
          Number(value),
          this.processedData.header[0][value]
        );
      } else {
        categoricalCount++;
        this.pushDataIntoTypes(
          'categorical',
          Number(value),
          this.processedData.header[0][value]
        );
      }
    }
    return [numericalCount, categoricalCount];
  }

  pushDataIntoTypes(type: string, value: number, header: string) {
    let array = [];
    for (const index in this.processedData.data) {
      array.push(this.processedData.data[index][value]);
    }
    if (type === 'numerical') {
      this.numericalProcessedData.push({ header: header, data: array });
    } else if (type === 'categorical') {
      this.categoricalProcessedData.push({ header: header, data: array });
    }

  }

  downloadPDF(): void {

    let DATA: any = document.getElementById('download-div');

    html2canvas(DATA).then((canvas) => {

      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const FILEURI = canvas.toDataURL('image/png');

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(FILEURI, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(FILEURI, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('visualEye.pdf');
    });

  }

  clearUpload() {
    this.cardsData = [];
    this.processedData = undefined;
    this.categoricalProcessedData = [];
    this.numericalProcessedData = [];
  }
}
