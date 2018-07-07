import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  rows = [];
  columns = [
    {prop: 'id', name: 'ID'},
    {prop: 'name', name: 'Name'},
    {prop: 'price', name: 'Price'},
    {prop: 'description', name: 'Description'},
    {prop: 'hits', name: 'Hits'},
    {prop: 'onSale', name: 'onSale'},
    {prop: 'color', name: 'Color'},
    {prop: 'themeId', name: 'Theme'},
  ];

  themeList = [];

  //item = new Item();

  selected = [];
  constructor() { }

  ngOnInit() {
  }
  onSale(row) {
    console.log(row);
  }
  selectItem(i) {
    //this.item = i.selected[0];
  }
}
