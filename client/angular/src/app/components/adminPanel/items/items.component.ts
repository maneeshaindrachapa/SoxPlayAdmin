import { Component, OnInit } from '@angular/core';
import { Item } from "../../../services/sdk/models";
import { ItemApi, ThemeApi } from '../../../services/sdk/services/custom';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  rows = [];
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Name' },
    { prop: 'price', name: 'Price' },
    { prop: 'description', name: 'Description' },
    { prop: 'hits', name: 'Hits' },
    { prop: 'onSale', name: 'onSale' },
    { prop: 'color', name: 'Color' },
    { prop: 'themeId', name: 'Theme' },
  ];

  themeList = [];

  item = new Item();

  selected = [];

  constructor(private itemApi: ItemApi, private themeApi: ThemeApi) {

  }

  ngOnInit() {
    this.themeApi.find().subscribe(res => {
      this.themeList = res;
    });
    this.itemApi.find({ include: 'theme' }).subscribe(res => {
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
    for (let theme = 1; theme <= this.themeList.length; theme++) {
      if (theme = this.item.themeId) {
        console.log(this.themeList[theme - 1]);
        this.item.theme = this.themeList[theme - 1];
        break;
      }
    }
    this.itemApi.upsert(this.item).subscribe(res => {
      this.selected[0] = res;
      this.rows = [...this.rows];
      this.selected = [];
    });
    Swal("Updated!", "You Item Details are Updated", "success");
  }

  deleteItem() {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        ),
          this.itemApi.deleteById(this.item.id).subscribe(res => {
            this.ngOnInit();
          })
      } else {
        Swal(
          'Cancelled',
          'Your item is safe',
          'error'
        )
      }
    })
  }

  selectItem(i) {
    this.item = i.selected[0];
  }
}
