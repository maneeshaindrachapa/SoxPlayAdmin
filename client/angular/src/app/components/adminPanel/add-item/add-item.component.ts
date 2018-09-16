import { Component, OnInit } from '@angular/core';
import {Item} from "../../../services/sdk/models";
import { ItemApi,ThemeApi } from '../../../services/sdk/services/custom';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item = new Item();
  themeList = [];

  constructor(private itemApi:ItemApi,private themeApi:ThemeApi) {
    
  }

  ngOnInit() {
    this.themeApi.find().subscribe(res => {
      this.themeList = res;
    });  
  }
  
  addItem() {
    this.itemApi.create(this.item).subscribe(res => {
      Swal("Item Added!", "You Item Added Successfully", "success");
    });
  }
}
