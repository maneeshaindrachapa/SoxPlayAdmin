import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderDetailApi, ItemApi } from '../../../services/sdk/services/custom';
import { parseDate } from 'ngx-bootstrap/chronos';
import { IfStmt } from '@angular/compiler';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-top-five-items',
  templateUrl: './top-five-items.component.html',
  styleUrls: ['./top-five-items.component.css']
})
export class TopFiveItemsComponent implements OnInit {
  totalOrders = [];
  finalOrderList = [];
  finalOrderCount = [];
  chart_ = [];
  constructor(private orderApi: OrderDetailApi, private elementRef: ElementRef, private itemApi: ItemApi) { }

  ngOnInit() {
    this.getOrderDetails()
  }
  getOrderDetails() {
    this.orderApi.find().subscribe(data => {
      this.totalOrders = data;
      let temp = [];
      for (let i = 0; i < this.totalOrders.length; i++) {
        temp.push(this.totalOrders[i]["itemId"]);
      }
      temp.sort(); //sort array

      let newTemp = Array.from(new Set(temp.map((itemInArray) => itemInArray))); //remove multiple occurings
      let finalTemp = this.makeArray(0, newTemp.length); //to store counts
      for (let j = 0; j < newTemp.length; j++) {
        finalTemp[j].push(newTemp[j]);
        finalTemp[j].push(this.countInArray(temp, newTemp[j]));
      }
      finalTemp.sort(this.compareSecondColumn);
      for (let i = 0; i < 5; i++) {
        this.finalOrderCount.push(finalTemp[finalTemp.length - 1 - i][1]);
        this.itemApi.findById(finalTemp[finalTemp.length - 1 - i][0]).subscribe(data => {
          this.finalOrderList.push(data["name"]);
        })
      }
      //console.log(newTemp);
      //console.log(this.finalOrderCount);
      setTimeout(() => { 
        this.createChart(); 
      },200);

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
        labels: this.finalOrderList,
        datasets: [
          {
            label: "Items Sold",
            backgroundColor: ['#007bff', '#007bff', '#007bff', '#007bff', '#007bff'],
            data: this.finalOrderCount
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
