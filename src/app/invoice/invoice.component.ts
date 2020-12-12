import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../shared/print.service';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  totReport: any;
  totCompleted: any;
  totAttempt: number;
  totAvgPercent: any;
  totAvgcompPercent: number;

  constructor(route: ActivatedRoute,
    private printService: PrintService,private stud: StudentService) {
    this.invoiceIds = route.snapshot.params['invoiceIds']
      .split(',');
  }

  ngOnInit() {
    this.invoiceDetails = this.invoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.invoiceDetails)
      .then(() => this.printService.onDataReady());
  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({ amount }), 1000)
    );
  }
  getTotalReport(profile_no) {
    const key = "report_profile=" + profile_no;
    this.stud.getListId("students_report", key).subscribe((dataRes) => {
      console.log(dataRes);
      this.totReport = dataRes;
      this.totCompleted = this.totReport.length;

      dataRes.forEach(element => {
        this.totAttempt += Number(element.report_attempt);
        this.totAvgPercent = this.totAvgPercent + Number(element.report_mark);
      });
      this.totAvgcompPercent = this.totAvgPercent / this.totCompleted;
      this.totAvgPercent = this.totAvgPercent / this.totAttempt;

    })
  }

}
