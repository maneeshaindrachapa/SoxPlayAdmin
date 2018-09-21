import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderApi } from '../../../services/sdk/services/custom';
import { parseDate } from 'ngx-bootstrap/chronos';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent implements OnInit {
  chart = [];
  date_now: Date = new Date();
  date_old: Date = new Date();
  date_old1: Date = new Date();
  weekly_salerev: number = 0;
  weekly_salerev_: number = 0;

  percentage: number = 0;
  constructor(private orderApi: OrderApi, private elementRef: ElementRef) {
    this.date_old.setDate(this.date_now.getDate() - 6);
    this.date_old1.setDate(this.date_now.getDate() - 13);
  }

  ngOnInit() {
    this.getSales();
  }
  getSales() {
    this.orderApi.find().subscribe(data => {
      let sale_Dates = [];
      let sales_weekly = [];
      let sales_weekly1 = [];
      let dates_ = [];
      let dates_1 = [];
      //get dates
      for (let j = 0; j < 7; j++) {
        let temp_: Date = new Date();
        temp_.setDate(temp_.getDate() - j);
        sale_Dates.push(temp_.toLocaleDateString('en', { month: 'long', day: 'numeric' }));
        dates_.push(temp_);
      }
      for (let j = 0; j < 7; j++) {
        let temp_: Date = new Date();
        temp_.setDate(temp_.getDate() - j - 7);
        dates_1.push(temp_);
      }

      for (let j = 0; j < dates_.length; j++) {
        let temp_sales = 0;
        let temp_sales_ = 0;
        for (let i = 0; i < data.length; i++) {
          if (parseDate(data[i]["addedDate"]).getDate() == dates_[j].getDate() && parseDate(data[i]["addedDate"]).getMonth() == dates_[j].getMonth() && parseDate(data[i]["addedDate"]).getFullYear() == dates_[j].getFullYear()) {
            temp_sales += parseFloat(data[i]['finalCost']);
          }
          if (parseDate(data[i]["addedDate"]).getDate() == dates_1[j].getDate() && parseDate(data[i]["addedDate"]).getMonth() == dates_1[j].getMonth() && parseDate(data[i]["addedDate"]).getFullYear() == dates_1[j].getFullYear()) {
            temp_sales_ += parseFloat(data[i]['finalCost']);
          }
        }
        sales_weekly.push(temp_sales);
        sales_weekly1.push(temp_sales_);
      }
      for (let i = 0; i < sales_weekly.length; i++) {
        this.weekly_salerev += sales_weekly[i];
        this.weekly_salerev_ += sales_weekly1[i];
      }
      this.calcPercentage();
      let htmlRef = this.elementRef.nativeElement.querySelector('#items-chart');
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: sale_Dates,
          datasets: [
            {
              data: sales_weekly,
              borderColor: '#007bff',
              fillColor: '#007bff',
              strokeColor: '#007bff',
              pointColor: '#007bff',
              fill:true
            }, {
              data: sales_weekly1,
              fillColor: '#ced4da',
              strokeColor: '#ced4da',
              pointColor: '#ced4da',
              fill:true
            }
          ]
        },
        options: {
          showScale: true,
          scaleShowGridLines: false,
          scaleGridLineWidth: 1,
          scaleShowHorizontalLines: true,
          scaleShowVerticalLines: true,
          bezierCurve: true,
          bezierCurveTension: 0.3,
          pointDotStrokeWidth: 1,
          pointHitDetectionRadius: 20,
          datasetStroke: true,
          datasetStrokeWidth: 2,
          datasetFill: true,
          maintainAspectRatio: false,
          responcive: true,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true,
                lineWidth: "4px",
                color: "rgba(0, 0, 0, .2)",
                zeroLineColor: "transparent"
              }
            }],
            xAxes: [{
              display: true,
              gridLines: {
                display: false
              }
            }]
          }
        }
      });
      console.log(this.chart);
    });
    
  }

  calcPercentage() {
    if(this.weekly_salerev_==0){
      this.percentage = parseFloat((((this.weekly_salerev - 0) /1) * 100).toPrecision(4));
    }else{
      this.percentage = parseFloat((((this.weekly_salerev - this.weekly_salerev_) / this.weekly_salerev_) * 100).toPrecision(4));
    }
  }
}
