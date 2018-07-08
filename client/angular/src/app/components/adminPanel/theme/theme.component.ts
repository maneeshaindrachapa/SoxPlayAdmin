import { Component, OnInit } from '@angular/core';
import {Theme} from '../../../services/sdk/models';
import { ThemeApi } from '../../../services/sdk/services/custom';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  rows = [];
  columns = [
    {prop: 'id', name: 'ID'},
    {prop: 'name', name: 'Theme Name'},
    {prop: 'expired', name: 'Expired'},
    {prop: 'fullPackPrice', name: 'Full Pack Price'},
  ];

  selected = [];

  theme = new Theme();
  theme_=new Theme()


  constructor(private api:ThemeApi) { }

  ngOnInit() {
    this.api.find().subscribe(data => {
      this.rows = data;
    });
  }

  addTheme() {
    this.api.create(this.theme).subscribe(res => {
      this.rows.push(res);
      this.rows = [...this.rows];
      Swal("Theme Added!", "You Theme Added Successfully", "success");
    });
  }

  editTheme() {
    this.api.upsert(this.theme_).subscribe(res => {
      this.selected[0] = res;
      this.rows = [...this.rows];
      Swal("Updated!", "Your Theme Details are Updated", "success");
    });
  }

  deleteTheme() {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this theme!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal(
          'Deleted!',
          'Your theme has been deleted.',
          'success'
        ),
        this.api.deleteById(this.theme_.id).subscribe(res => {
          this.ngOnInit();
        })
      } else {
        Swal(
          'Cancelled',
          'Your theme is safe',
          'error'
        )
      }
    })
  }

  selectTheme(t) {
    this.theme_ = t.selected[0];
  }

}
