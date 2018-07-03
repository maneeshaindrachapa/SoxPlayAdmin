import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pushmenu:string="sidebar-collapse";
  pushmenuVisibility:boolean=true;
  constructor() { }

  ngOnInit() {
  }

  logout_btn_clicked(){
    alert("want to logout?");
  }
  pushmenu_btn_clicked(){
    this.pushmenuVisibility=!this.pushmenuVisibility;
    if(this.pushmenu=="sidebar-open"){
      this.pushmenu="sidebar-collapse";
    }else{
      this.pushmenu="sidebar-open";
    }
  }
}
