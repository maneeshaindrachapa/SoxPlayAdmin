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
  totalOrders = [];
  finalOrderList = [];
  finalThemeCount = [];
  totalThemes = [];
  finalThemeNames = [];
  finalOrderCount = [];
  chart_ = [];
  constructor(private orderApi: OrderDetailApi, private elementRef: ElementRef, private itemApi: ItemApi, private themeApi: ThemeApi) { }

  ngOnInit() {
    this.themeDetails()
  }
  themeDetails() {
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
      this.themeApi.find().subscribe(data => {
        this.totalThemes = data;
        let temp = []
        for (let i = 0; i < this.totalThemes.length; i++) {
          temp.push(this.totalThemes[i]["name"]);
        }
      })
      
    })

    /*for (let i = 0; i < data.length; i++) {
      this.totalThemes.push(data[i]["id"]);
    }*/


    /*for (let i = 0; i < 5; i++) {
      this.finalOrderCount.push(finalTemp[finalTemp.length - 1 - i][1]);
      this.itemApi.findById(finalTemp[finalTemp.length - 1 - i][0]).subscribe(data => {
        tempFinalOrderlist.push(data["themeId"]);
      })
    }
    console.log(newTemp);
    console.log(this.finalOrderCount);
    this.createChart();*/

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
    let htmlRef = this.elementRef.nativeElement.querySelector('#orders-chart');
    this.chart_ = new Chart(htmlRef, {
      type: 'doughnut',
      data: {
        labels: this.finalThemeNames,
        datasets: [
          {
            label: "Orders",
            backgroundColor: ['#007bff', "#ced4da"],
            data: this.finalThemeCount
          }
        ]
      },
      options: {
        legend: false,
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        //String - The colour of each segment stroke
        segmentStrokeColor: '#fff',
        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        //Number - Amount of animation steps
        animationSteps: 100,
        //String - Animation easing effect
        animationEasing: 'easeOutBounce',
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: false,
        //String - A legend template
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
      }
    });

    console.log(this.chart_);
  }


}
