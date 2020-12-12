import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-s-profile',
  templateUrl: './s-profile.component.html',
  styleUrls: ['./s-profile.component.scss']
})
export class SProfileComponent implements OnInit {
  websiteList: any = ['ItSolutionStuff.com', 'HDTuto.com', 'Nicesnippets.com']



  form = new FormGroup({

    website: new FormControl('', Validators.required)

  });



  get f() {

    return this.form.controls;

  }



  submit() {

    console.log(this.form.value);

  }
  constructor() { }

  ngOnInit(): void {
  }

}
