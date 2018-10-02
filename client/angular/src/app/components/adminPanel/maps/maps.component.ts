import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { StoresApi } from '../../../services/sdk/services/custom';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  totalStores=[];
  latitudes=[];
  longitudes=[];
  lng: number = 10;
  lat: number = 45.568;

  constructor(private storeApi:StoresApi) { }

  ngOnInit() {
    this.getStoreDetails();
  }
  
  getStoreDetails(){
    this.storeApi.find().subscribe(data=>{
      this.totalStores=data;
      for(let i=0;i<this.totalStores.length;i++){
        this.latitudes.push(this.totalStores[i]["lat"]);
        this.longitudes.push(this.totalStores[i]["lng"]);
      }
    })
  }
}
