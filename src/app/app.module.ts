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
@NgModule({
  declarations: [
    AppComponent,
    SProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    FormsModule,

    ReactiveFormsModule,
    MatSliderModule,
    MatTableModule,
    
    MatButtonModule,
    MatCardModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
