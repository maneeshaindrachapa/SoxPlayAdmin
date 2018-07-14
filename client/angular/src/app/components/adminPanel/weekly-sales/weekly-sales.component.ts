import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderDetailApi } from '../../../services/sdk/services/custom';
import { parseDate } from '../../../../../node_modules/ngx-bootstrap/chronos';

@Component({
  selector: 'app-weekly-sales',
  templateUrl: './weekly-sales.component.html',
  styleUrls: ['./weekly-sales.component.css']
})
export class WeeklySalesComponent implements OnInit {
  chart = [];
  date_now: Date = new Date();
  date_old: Date = new Date();
  date_old1: Date = new Date();
  weekly_saleitems: number = 0;
  weekly_saleitems_:number=0;
  percentage:number=0;

  constructor(private orderDetailApi: OrderDetailApi, private elementRef: ElementRef) {
    this.date_old.setDate(this.date_now.getDate() - 6);
    this.date_old1.setDate(this.date_now.getDate() - 13);
  }

  ngOnInit() {
    this.getItemsSold();
  }

  getItemsSold() {
    this.orderDetailApi.find({ include: ["order"] }).subscribe(data => {
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
        let temp_sales_=0;
        for (let i = 0; i < data.length; i++) {
          let quantity = parseInt(data[i]["quantity"]);
          let fullPack = parseInt(data[i]["fullpack"]);
          let pair = parseInt(data[i]["pair"]);
          let itemID = parseInt(data[i]["itemId"]);
          let temp = 0;
          if (fullPack > 0) {
            temp += fullPack * quantity * 6;
          }
          if (pair > 0) {
            temp += pair * quantity * 2;
          }
          if (itemID > 0) {
            temp += 1 * quantity;
          }
          if (parseDate(data[i]["order"]["addedDate"]).getDate() == dates_[j].getDate() && parseDate(data[i]["order"]["addedDate"]).getMonth() == dates_[j].getMonth() && parseDate(data[i]["order"]["addedDate"]).getFullYear() == dates_[j].getFullYear()) {
            temp_sales += temp;
          }
          if (parseDate(data[i]["order"]["addedDate"]).getDate() == dates_1[j].getDate() && parseDate(data[i]["order"]["addedDate"]).getMonth() == dates_1[j].getMonth() && parseDate(data[i]["order"]["addedDate"]).getFullYear() == dates_1[j].getFullYear()) {
            temp_sales_ += temp;
          }
        }
        sales_weekly.push(temp_sales);
        sales_weekly1.push(temp_sales_);
      }
      for(let i=0;i<sales_weekly.length;i++){
        this.weekly_saleitems+=sales_weekly[i];
        this.weekly_saleitems_+=sales_weekly1[i];
      }
      this.calcPercentage();
      let mode = 'index'
      let intersect = true
      let htmlRef = this.elementRef.nativeElement.querySelector('#visitors-chart');
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: sale_Dates,
          datasets: [
            {
              data: sales_weekly,
              backgroundColor: 'transparent',
              borderColor: '#007bff',
              pointBorderColor: '#007bff',
              pointBackgroundColor: '#007bff',
              fill: false
            },{
              data                : sales_weekly1,
              backgroundColor     : 'tansparent',
              borderColor         : '#ced4da',
              pointBorderColor    : '#ced4da',
              pointBackgroundColor: '#ced4da',
              fill                : false
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            mode: mode,
            intersect: intersect
          },
          hover: {
            mode: mode,
            intersect: intersect
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              display: true,
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
    });
  }
  calcPercentage(){
    this.percentage=parseFloat((((this.weekly_saleitems-this.weekly_saleitems_)/this.weekly_saleitems_)*100).toPrecision(4));
  }
}
