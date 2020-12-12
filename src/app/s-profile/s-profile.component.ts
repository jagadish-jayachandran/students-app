import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrintService } from '../shared/print.service';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-s-profile',
  templateUrl: './s-profile.component.html',
  styleUrls: ['./s-profile.component.scss']
})
export class SProfileComponent implements OnInit {
  // gradeList: any = [1,2,3]
  // languageList:any =['Language Arts','Language Computer']
  // durationList:any =['Last Month','Last week','yesterday']
  // classList: any = ['Intermediate']

  form = new FormGroup({
    grade: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    duration:new FormControl(''),
    class: new FormControl('', Validators.required)

  });
  profile_name: any;
  student_report: any;

  attempt: any;
  subjectList: any = [];
  languageList: any=[];
  gradeList: any=[];
  classList: any=[];
  durationList: any=[];
  lessonList: any=[];
  unitList: any=[];
  gradeName: any;
  report_subj: any;
  unit_name: any;
  class_name: any;
  profile_no: any;
  today = new Date();
  d:any = Date();
  fromdate: any;
  dd: any;
  totReport: any;
  totAttempt: number = 0;
  totCompleted: any;
  totAvgPercent: number =0;
  totAvgcompPercent: number;
      // this.fromdate = this.d;


  get f() {

    return this.form.controls;

  }

  submit() {
    console.log(this.form.value);
    let val = this.form.value,td1,d1;
    if(val.duration == 1) {
      let d = new Date();
      let td = new Date();
      td1 = this.formatDate(td);
      d.setDate(d.getDate() - 356);
      d1 = this.formatDate(d);
    
    } else if (val.duration == 2) {
      let d = new Date();
      let td = new Date();
      td1 = this.formatDate(td);
      d.setDate(d.getDate() - 28);
      d1 = this.formatDate(d);
      this.fromdate = this.d;

    } else if (val.duration == 3) {
      let d = new Date();
      let td = new Date();
      td1 = this.formatDate(td);
      d.setDate(d.getDate() - 7);
      d1 = this.formatDate(d);

    }
    const argno = " AND report_grade=" + val.grade + " AND report_subj=" + val.language
    + " AND report_level="+ val.class +" AND report_date BETWEEN "+  d1 + " and "+ td1;
    this.getReportCard(argno)
  }
  constructor(private stud: StudentService, public printService: PrintService) { }

  ngOnInit(): void {
    var td = new Date();
    this.fromdate = this.formatDate(this.d);
    // console.log('Today is: ' + d.toLocaleString() + td1);
    td.setDate(td.getDate() - 365);
    // d1 = this.formatDate(d);
    this.dd = td;
    // console.log('3 days ago was: ' + d.toLocaleString() + d1);
    this.getProfile();
    this.getGrade();
    this.getLevel();
    this.getSubject();
    this.getlessons();
    this.getDuration();
    this.getUnit();
  }
  onPrintInvoice() {
    const invoiceIds = ['101', '102'];
    this.printService
      .printDocument('invoice', invoiceIds);
  }
  formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}
  getProfile(){
    this.stud.getList("students_profile").subscribe((dataRes:any) => {
      console.log(dataRes);
      this.profile_name = dataRes[0].profile_name;
      this.profile_no = dataRes[0].profile_no;
      this.getTotalReport();
    })
  }
  getSubject() {
    this.stud.getList("students_subject").subscribe((dataRes) => {
      console.log(dataRes)
      this.languageList = dataRes; 
    })
  }
  getDuration() {
    this.stud.getList("students_duration").subscribe((dataRes) => {
      console.log(dataRes)
      this.durationList = dataRes;
    })
  }
  getGrade() {
    this.stud.getList("students_grade").subscribe((dataRes) => {
      console.log(dataRes)
      this.gradeList = dataRes;
    })
  }
  getlessons() {
    this.stud.getList("student_lessons").subscribe((dataRes) => {
      console.log(dataRes)
      this.lessonList = dataRes;
    })
  }
  getUnit() {
    this.stud.getList("students_unit").subscribe((dataRes) => {
      console.log(dataRes)
      this.unitList = dataRes;
    })
  }
  getLevel() {
    this.stud.getList("studentslevel").subscribe((dataRes) => {
      console.log(dataRes)
      this.classList =  dataRes;
    })
  }
  getTotalReport() {
    const key = "report_profile=" + this.profile_no;
    this.stud.getListId("students_report", key).subscribe((dataRes) => {
      console.log(dataRes);
      this.totReport = dataRes;
      this.totCompleted = this.totReport.length;

      dataRes.forEach(element => {
        this.totAttempt += Number(element.report_attempt);
        this.totAvgPercent = this.totAvgPercent + Number(element.report_mark);
      });
      this.totAvgcompPercent = this.totAvgPercent / this.totCompleted;
      this.totAvgPercent = this.totAvgPercent/this.totAttempt;

    })
  }
  getReportCard(no) {
    const key ="report_profile="+this.profile_no + (no ? no : "");
    this.stud.getListId("students_report",key).subscribe((dataRes) => {
      console.log(dataRes);
      this.student_report = [];
      this.gradeName = '';
      this.report_subj = '';
      this.unit_name = '';
      this.class_name = '';

      if(dataRes.length > 0) {

      this.gradeName = dataRes[0].report_grade;
      
      this.gradeList.forEach(element => {
        if(this.gradeName == element.grade_no) {
          this.gradeName = element.grade_name;
        }
      });

      this.report_subj = dataRes[0].report_subj;

      this.languageList.forEach(element => {
        if(this.report_subj == element.sub_no) {
          this.report_subj =element.sub_name;
        }
      });
      this.unit_name = dataRes[0].report_unit;

      this.unitList.forEach(element => {
        if(this.unit_name == element.unit_no) {
          this.unit_name = element.unit_name;
        }
      });

      this.class_name = dataRes[0].report_level;

      this.classList.forEach(element => {
        if(this.class_name == element.level_no) {
          this.class_name = element.level_name;
        }
      });
      dataRes.forEach(element => {
        this.lessonList.forEach(lesson => {
          if (element.report_lesson == lesson.lesson_no)   
          element.report_lesson = lesson.lesson_name
        });
        
      });
      this.student_report = dataRes;
    }

    })
  }


}
