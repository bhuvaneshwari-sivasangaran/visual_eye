import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GeneralService } from './service/general.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { DynamicComponentHighchartComponent } from "./util/dynamic-component-highchart/dynamic-component-highchart.component";

@NgModule({
    declarations: [
        AppComponent,
        DynamicComponentHighchartComponent
    ],
    providers: [
        GeneralService
    ],
    bootstrap: [
      AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HighchartsChartModule,
    ]
})
export class AppModule { }
