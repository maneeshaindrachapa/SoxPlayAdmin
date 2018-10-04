import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderDetailApi, ItemApi, ThemeApi } from '../../../services/sdk/services/custom';
import { parseDate } from 'ngx-bootstrap/chronos';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-top-five-themes',
  templateUrl: './top-five-themes.component.html',
  styleUrls: ['./top-five-themes.component.css']
})
export class TopFiveThemesComponent implements OnInit {
  chart_ = [];
  totalItemsThemesSold = [];
  topFiveThemes = [];
  topfiveThemesCount = [];
  constructor(private orderApi: OrderDetailApi, private elementRef: ElementRef, private itemApi: ItemApi, private themeApi: ThemeApi) { }

  ngOnInit() {
    this.themeDetails();
  }

  themeDetails() {
    this.orderApi.find({ include: ['item'] }).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.totalItemsThemesSold.push(data[i]["item"]["themeId"]);
      }

      let newTemp = Array.from(new Set(this.totalItemsThemesSold.map((itemInArray) => itemInArray)));
      let finalTemp = this.makeArray(0, newTemp.length);
      for (let j = 0; j < newTemp.length; j++) {
        finalTemp[j].push(newTemp[j]);
        finalTemp[j].push(this.countInArray(this.totalItemsThemesSold, newTemp[j]));
      }
      finalTemp.sort(this.compareSecondColumn);
      let length_ = newTemp.length;
      if (length_ >= 5) {
        length_ = 5;
      }
      for (let i = 0; i < length_; i++) {
        this.topfiveThemesCount.push(finalTemp[finalTemp.length - 1 - i][1]);
        this.themeApi.findById(finalTemp[finalTemp.length - 1 - i][0]).subscribe(data => {
          this.topFiveThemes.push(data["name"]);
        });
      }
      setTimeout(() => {
        this.createChart();
      }, 200);
    });
  }

  countInArray(array, what) { //count numbers in array
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === what) {
        count++;
      }
    }
    return count;
  }

  makeArray(d1, d2) { //create multi dimentional array
    var arr = new Array(d1), i, l;
    for (i = 0, l = d2; i < l; i++) {
      arr[i] = new Array(d1);
    }
    return arr;
  }

  compareSecondColumn(a, b) { //compare second column
    if (a[1] === b[1]) {
      return 0;
    }
    else {
      return (a[1] < b[1]) ? -1 : 1;
    }
  }

  createChart() {
    let htmlRef_ = this.elementRef.nativeElement.querySelector('#bar-chart-horizontal');
    this.chart_ = new Chart(htmlRef_, {
      type: 'bar',
      data: {
        labels: this.topFiveThemes,
        datasets: [
          {
            label: "Themes Sold",
            backgroundColor: ['#007bff', '#007bff', '#007bff', '#007bff', '#007bff'],
            data: this.topfiveThemesCount,
          }
        ]
      },
      options: {
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
              lineWidth: "px",
              color: "rgba(0, 0, 0, .2)",
              zeroLineColor: "transparent"
            },
            ticks: {
              beginAtZero: true
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

  }


}
