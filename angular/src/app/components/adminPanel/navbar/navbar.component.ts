import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logout:boolean=false;
  constructor() { }

  ngOnInit() {
  }

  logout_btn_clicked(){
    this.logout=!this.logout;
    console.log("ass");
  }
}
