import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import exporting from 'highcharts/modules/exporting';
import accessibility from 'highcharts/modules/accessibility';
import histogramBellcurve from 'highcharts/modules/histogram-bellcurve';
import exportData from 'highcharts/modules/export-data';
exporting(Highcharts);
accessibility(Highcharts);
histogramBellcurve(Highcharts);
exportData(Highcharts);

@Component({
  selector: 'app-dynamic-component-highchart',
  templateUrl: './dynamic-component-highchart.component.html',
  styleUrls: ['./dynamic-component-highchart.component.css'],
})
export class DynamicComponentHighchartComponent implements OnInit {
  @Input() chartData: any;
  @Input() dataType!: string;
  @Input() chartTitle! : string;
  chartType!: string;
  chartOptions!: Highcharts.Options;
  private colors = ['#192F01', '#E0475B', '#DED369', '#F8EFEA'];
  private CategoricalChartTypes = ['column', 'pie'];
  private NumericalChartTypes = ['line', 'histogram'];

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  ngOnInit(): void {
    if (this.dataType === 'Categorical') {
      this.loadUniCategoricalChart();
    } else if (this.dataType === 'Numerical') {
      this.loadUniNumericalChart();
    }
  }

  loadUniCategoricalChart() {
    this.chartType =
      this.CategoricalChartTypes[
        Math.floor(Math.random() * this.CategoricalChartTypes.length)
      ];
    this.changeCategoricalChartType(this.chartType);
  }

  loadUniNumericalChart() {
    this.chartType =
      this.NumericalChartTypes[
        Math.floor(Math.random() * this.NumericalChartTypes.length)
      ];
    this.changeNumericalChartType(this.chartType);
  }

  BuildCategoryMap() {
    let categoricalMap = new Map();
    for (let index = 0; index < this.chartData.length; index++) {
      if (categoricalMap.get(this.chartData[index])) {
        let temp = categoricalMap.get(this.chartData[index]);
        categoricalMap.delete(this.chartData[index]);
        categoricalMap.set(this.chartData[index], temp + 1);
      } else {
        categoricalMap.set(this.chartData[index], 1);
      }
    }

    return categoricalMap;
  }

  ConstructColumnChart(categoricalMap: Map<string, number>) {

    this.chartOptions = {
      title: { text: this.chartTitle },
      xAxis: {
        title: { text: this.chartTitle },
        categories: Array.from(categoricalMap.keys()),
      },
      colors: this.colors,
      series: [
        {
          name: this.chartTitle,
          type: 'column',
          data: Array.from(categoricalMap.values()),
        },
      ],
    };

  }

  ConstructPieChart(categoricalMap: Map<string, number>) {
    let data: { name: string; y: any }[] = [];
    for (const [key, value] of categoricalMap) {
      data.push({ name: key, y: value });
    }

    this.chartOptions = {
      title: { text: this.chartTitle },
      colors: this.colors,
      xAxis: {
        title: { text: this.chartTitle },
      },
      series: [
        {
          type: 'pie',
          name: this.chartTitle,
          data: data,
        },
      ],
    };
  }

  ConstructHistogramChart(data: any) {
    this.chartOptions = {
      title: { text: this.chartTitle },
      xAxis: [{ title: { text: this.chartTitle } }, { title: { text: '' } }],
      yAxis: [{ title: { text: this.chartTitle } }, { title: { text: '' } }],
      colors: this.colors,
      series: [
        {
          name: this.chartTitle,
          type: 'histogram',
          xAxis: 1,
          yAxis: 1,
          baseSeries: 's1',
          zIndex: -1,
        },
        {
          type: 'scatter',
          id: 's1',
          data: data,
        },
      ],
    };
  }

  ConstructLineChart(data: any) {

    this.chartOptions = {
      title: { text: this.chartTitle },
      colors: this.colors,
      xAxis: [{ title: { text: this.chartTitle } }, { title: { text: '' } }],
      yAxis: [{ title: { text: this.chartTitle } }, { title: { text: '' } }],
      series: [
        {
          type: 'line',
          name: this.chartTitle,
          data: data,
        },
      ],
    };

  }

  changeCategoricalChartType(type: string) {
    this.chartType = type;
    let categoricalMap = this.BuildCategoryMap();

    if (type === 'column') {
      this.ConstructColumnChart(categoricalMap);
    } else if (type === 'pie') {
      this.ConstructPieChart(categoricalMap);
    }
  }

  changeNumericalChartType(type: string) {
    this.chartType = type;
    let data: number[] = [];
    for (let val of this.chartData) {
      data.push(Number(val));
    }

    if (type === 'histogram') {
      this.ConstructHistogramChart(data);
    } else if (type === 'line') {
      this.ConstructLineChart(data);
    }
  }
}
