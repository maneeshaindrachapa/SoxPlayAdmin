import { Component, OnInit, ElementRef } from '@angular/core';
import { OrderApi } from '../../../services/sdk/services/custom';
import { parseDate } from '../../../../../node_modules/ngx-bootstrap/chronos';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-orders-chart',
  templateUrl: './orders-chart.component.html',
  styleUrls: ['./orders-chart.component.css']
})
export class OrdersChartComponent implements OnInit {
  totalOrders: number = 0;
  incompleteOrders: number = 0;
  chart = [];
  chart_=[];
  percentage:number=0;

  constructor(private orderApi: OrderApi, private elementRef: ElementRef) { }

  ngOnInit() {
    this.getNoOfOrders();
    this.getIncompleteOrders();
  }

  getNoOfOrders() {
    this.orderApi.find().subscribe(data => {
      this.totalOrders = data.length;
    });
  }

  getIncompleteOrders() {
   /* this.orderApi.byStatus("pending").subscribe(data => {
      this.incompleteOrders = data.length;
      this.createChart();
    });*/
  }

  createChart() {
    let htmlRef = this.elementRef.nativeElement.querySelector('#orders-chart');
    this.chart = new Chart(htmlRef, {
      type: 'doughnut',
      data: {
        labels: ["Total Orders","Pending Orders"],
        datasets: [
          {
            label: "Orders",
            backgroundColor: ['#007bff', "#ced4da"],
            data: [this.totalOrders,this.incompleteOrders]
          }
        ]
      },
      options: {
        legend:false,
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

    let htmlRef_ = this.elementRef.nativeElement.querySelector('#bar-chart-horizontal');
    this.chart_=new Chart(htmlRef_, {
      type: 'bar',
      data: {
        labels: ["Total","Pending"],
        datasets: [
          {
            label: "Orders",
            backgroundColor: ['#007bff', "#ced4da"],
            data: [this.totalOrders,this.incompleteOrders]
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
    this.calcPercentage();
  }
  calcPercentage(){
    this.percentage=parseFloat((((this.incompleteOrders)/this.totalOrders)*100).toPrecision(4));
  }
}
