import { Component, OnInit } from '@angular/core';
import {Item} from "../../../services/sdk/models";
import { ItemApi,ThemeApi } from '../../../services/sdk/services/custom';

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

  item = new Item();

  selected = [];
  constructor(private itemApi:ItemApi,private themeApi:ThemeApi) { 

  }

  ngOnInit() {
    this.themeApi.find().subscribe(res => {
      this.themeList = res;
    });
    this.itemApi.find({include: 'theme'}).subscribe(res => {
      console.log(res);
      this.rows = res;
    });
  }
  onSale(row) {
    console.log(row);
  }

  addItem() {
    this.itemApi.create(this.item).subscribe(res => {
      this.rows.push(res);
      this.rows = [...this.rows];
    });
  }

  editItem() {
    this.itemApi.upsert(this.item).subscribe(res => {
      this.selected[0] = res;
      this.rows = [...this.rows];
      this.selected = [];
    });
  }

  deleteItem() {
    if (confirm('Are you sure to delete this items ?')) {
      this.itemApi.deleteById(this.item.id).subscribe(res => {
        this.ngOnInit();
      });
    }
  }

  selectItem(i) {
    this.item = i.selected[0];
  }
}
