import { Component, OnInit, ViewChild } from '@angular/core';
import { StoresApi } from '../../../services/sdk/services/custom';
import { Stores } from '../../../services/sdk/models/Stores';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  totalStores = [];
  store = new Stores();
  lng: number = 10;
  lat: number = 45.568;

  constructor(private storeApi: StoresApi) { }

  ngOnInit() {
    this.getStoreDetails();
  }

  getStoreDetails() {
    this.storeApi.find().subscribe(data => {
      this.totalStores = data;
    })
  }
  addStore() {
    this.storeApi.create(this.store).subscribe(res => {
      Swal("Branch Added!", "You Branch Added  to Map Successfully", "success");
      this.getStoreDetails();
    });
  }
}
