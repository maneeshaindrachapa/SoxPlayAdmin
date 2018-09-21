import { Component, OnInit } from '@angular/core';
import { UserApi,OrderApi,OrderDetailApi} from '../../../services/sdk/services/custom';
import { parseDate } from '../../../../../node_modules/ngx-bootstrap/chronos';

@Component({
  selector: 'app-data-box',
  templateUrl: './data-box.component.html',
  styleUrls: ['./data-box.component.css']
})
export class DataBoxComponent implements OnInit {
  date_now:Date = new Date();
  date_old:Date=new Date();
  sales:number;
  totalOrders:number;
  incompleteOrders:number
  customers:number;
  total_sold_items:number=0;
  items_weekly:number=0;
  totalSales:number=0;
  sales_weekly:number=0;

  constructor(private userApi:UserApi,private orderApi:OrderApi,private orderDetailApi:OrderDetailApi) { 
    this.date_old.setDate(this.date_now.getDate()-6);
  }

  ngOnInit() {
    this.getNoOfCustomers();
    this.getNoOfOrders();
    this.getIncompleteOrders();
    this.getItemsSold();
  }

  getNoOfCustomers(){
    this.userApi.find().subscribe(data=>{
      this.customers=data.length;
    });
  }
  getNoOfOrders(){
    this.orderApi.find().subscribe(data=>{
      this.totalOrders=data.length;
      for(let i=0;i<data.length;i++){
        this.totalSales+=parseFloat(data[i]['finalCost']);

        if(parseDate(data[i]["addedDate"]).getDate()<=this.date_now.getDate() && parseDate(data[i]["addedDate"]).getDate()>=this.date_old.getDate() && parseDate(data[i]["addedDate"]).getMonth()<=this.date_now.getMonth() && parseDate(data[i]["addedDate"]).getMonth()>=this.date_old.getMonth()&&parseDate(data[i]["addedDate"]).getFullYear()<=this.date_now.getFullYear() && parseDate(data[i]["addedDate"]).getFullYear()>=this.date_old.getFullYear() ){
          this.sales_weekly+=parseFloat(data[i]['finalCost']);
        }
      }
    });
  }
  getIncompleteOrders(){
    /*this.orderApi.byStatus("pending").subscribe(data=>{
      this.incompleteOrders=data.length;
    });*/
  }
  getItemsSold(){
    this.orderDetailApi.find({include:["order"]}).subscribe(data=>{
      for(let i=0;i<data.length;i++){
        let quantity=parseInt(data[i]["quantity"]);
        let fullPack=parseInt(data[i]["fullpack"]);
        let pair=parseInt(data[i]["pair"]);
        let itemID=parseInt(data[i]["itemId"]);
        let temp=0;
        if( fullPack>0){
          this.total_sold_items+=fullPack*quantity*6;
          temp+=fullPack*quantity*6;
        }
        if( pair>0){
          this.total_sold_items+=pair*quantity*2;
          temp+=pair*quantity*2;
        }
        if( itemID>0){
          this.total_sold_items+=1*quantity;
          temp+=1*quantity;
        }
        if(parseDate(data[i]["order"]["addedDate"]).getDate()<=this.date_now.getDate() && parseDate(data[i]["order"]["addedDate"]).getDate()>=this.date_old.getDate() && parseDate(data[i]["order"]["addedDate"]).getMonth()<=this.date_now.getMonth() && parseDate(data[i]["order"]["addedDate"]).getMonth()>=this.date_old.getMonth() && parseDate(data[i]["order"]["addedDate"]).getFullYear()<=this.date_now.getFullYear() && parseDate(data[i]["order"]["addedDate"]).getFullYear()>=this.date_old.getFullYear() ){
          this.items_weekly+=temp;
        }
        //console.log(this.total_sold_items);
      }
    });
  }
}
