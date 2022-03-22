import { DataService } from './../../share/service/data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(
    private dataService: DataService,
    private titleService: Title,
  ) {
    const url = (window.location.href).split('/');
    console.log(url)
    this.dataService.visitParamRouterChange(url[4]);
    this.titleService.setTitle('Employee Request');
  }

  ngOnInit(): void {
  }

  btnGeneratePDF() {
    const head = [

      ['ID', 'NAME', 'DESIGNATION', 'DEPARTMENT']]
    const data = [
      [1, 'ROBERT', 'SOFTWARE DEVELOPER', 'ENGINEERING'],
      [2, 'CRISTINAO','QA', 'TESTING'],
      [3, 'KROOS','MANAGER', 'MANAGEMENT'],
      [4, 'XYZ','DEVELOPER', 'DEVLOPEMENT'],
      [5, 'ABC','CONSULTANT', 'HR'],
      [73, 'QWE','VICE PRESIDENT', 'MANAGEMENT'],
      {id:{content: 'Data', colSpan: 5, styles: {halign: 'center', fillColor: [22, 160, 133]}}},
    ]

    var doc = new jsPDF('p', 'pt', 'a4');
    let left = 15;
    let top = 8;
    var imgData = 'http://localhost:9090/unsecure/api/file/index/1';
    doc.addImage(imgData, 'JPEG', 30, 30, 100, 100);


    doc.setFontSize(15);
    doc.text('ABA', 30, 150, {baseline: 'alphabetic', renderingMode: 'fill'});
    // doc.setFontSize(6);

    doc.setFontSize(12);
    doc.setTextColor("#1f1f1f");
    doc.setFont("bold");
    doc.text('Phone: 093883', 30, 165);

    doc.setFontSize(8);
    doc.setTextColor('#009efb');
    doc.textWithLink('http://localhost:9090/unsecure/api/file/index/1',  15, 170, '');
    doc.setFontSize(6);


    doc.setFontSize(20);
    doc.setTextColor("#1f1f1f");
    doc.text('Invoice', 460, 65);

    doc.setFontSize(12);
    doc.setFont("bold");
    doc.setTextColor("#1f1f1f");
    doc.text('Invoice No: fafkl', 435, 85);

    doc.setFontSize(12);
    doc.setFont("bold");
    doc.setTextColor("#1f1f1f");
    doc.text('Invoice date: fafkl', 435, 100);

    doc.setFontSize(12);
    doc.setFont("bold");
    doc.setTextColor("#1f1f1f");
    doc.text('Total: fafkl', 435, 115);

    (doc as any).autoTable({
      // styles: { fillColor: [255, 0, 0] },
      // columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } },
      head: head,
      body: data,
      margin: { top: 200 },
      lineColor:[0, 255, 0],
      theme: 'plain',
      // tableLineColor: '#5f6368',
      // tableLineWidth: 1,
      styles: {
        overflow: 'linebreak',
        columnWidth: 'wrap',
        font: 'arial',
        overflowColumns: 'linebreak'
    },
    headerStyles: {
        //columnWidth: 'wrap',
        theme: 'grid',
        cellPadding: 2,
        lineWidth: 0,
        valign:'top',
        fontStyle: 'bold',
         halign: 'left',    //'center' or 'right'
        fillColor: '#5f6368',
        //textColor: [78, 53, 73], //Black
        textColor: [255, 255, 255], //White
        fontSize: 8,
    },
    bodyStyles: {
        // textColor: [30, 30, 30],
        theme: 'grid',
        fillColor: [216, 216, 216],
        textColor: 50
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
  },
    // columnStyles: {
    //           1: {columnWidth: 150}
    // },
      didDrawCell: (data: any) => {
        console.log(data)
        data.cell.styles.textColor = '#5f6368';
        data.cell.styles.tableLineColor = '#5f6368';
        data.cell.styles.tableLineWidth = 1;
        if (data.row.raw[0]) {
          doc.setTextColor('red');
          doc.setFillColor('#5f6368'),
        //textColor: [78, 53, 73], //Black
        doc.setTextColor('red');
        doc.setTextColor(255, 255, 255); //White
        }
        // data.cell.styles.textColor = '#5f6368';
      }
    });
     // below line for Open PDF document in new tab
    //  doc.output('dataurlnewwindow')
     // below line for Download PDF document

    const t = data.length;
    let x = 210;
    for (let index = 0; index < t; index++) {
      x += 22;
    }

    console.log(x);

    doc.setFontSize(15);
    doc.setTextColor("#1f1f1f");
    doc.text('Amount : 100.00 USD', 350, x, {baseline: 'alphabetic', renderingMode: 'fill'});

    doc.text('Discount : 00.00 %', 350, ( x + 20 ), {baseline: 'alphabetic', renderingMode: 'fill'});

    doc.text('Total : 100.00 USD', 350, ( x + 45 ), {baseline: 'alphabetic', renderingMode: 'fill'});

    doc.setLineWidth(0.5);
    doc.setDrawColor('#5f6368');
     //  doc.line(300, 200, 555, 200);
    doc.line(350, (x + 27), 555, (x + 27));

// below line for Open PDF document in new tab
    //  doc.output('dataurlnewwindow');
     doc.save('myteamdetail.pdf');
  }

  async getBase64ImageFromUrl(imageUrl: string) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  downloadedImg : any;

  convert(){
    var doc = new jsPDF();
    var imgData = 'http://localhost:9090/unsecure/api/file/index/1';
    doc.output('datauri');
    doc.addImage(imgData, 'JPEG', 10, 10, 10,10);
    doc.setFontSize(40);
    doc.text('Hello world!', 1,1);
    doc.save('myteamdetail.pdf');

}


}
