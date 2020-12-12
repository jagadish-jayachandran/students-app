import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SProfileComponent } from './s-profile/s-profile.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 
import { MatTableModule } from '@angular/material/table'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from './shared/student.service';
import { HttpClientModule } from '@angular/common/http';
import { PrintService } from './shared/print.service';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { InvoiceComponent } from './invoice/invoice.component';
@NgModule({
  declarations: [
    AppComponent,
    SProfileComponent,
    PrintLayoutComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatTableModule,
    
    MatButtonModule,
    MatCardModule,
   

  ],
  providers: [StudentService,PrintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
