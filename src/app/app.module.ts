import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { DataDrivenComponent } from "./data-driven/data-driven.component";
//import { TemplateDrivenComponent } from "./template-driven/template-driven.component";


@NgModule({
    //declarations: [AppComponent, DataDrivenComponent, TemplateDrivenComponent],
    declarations: [AppComponent, DataDrivenComponent],
    imports: [BrowserModule, ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {}