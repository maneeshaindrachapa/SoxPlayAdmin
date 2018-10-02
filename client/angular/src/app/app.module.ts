import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin/signin.component';
import { NavbarComponent } from './components/adminPanel/navbar/navbar.component';
import { WeeklySalesComponent } from './components/adminPanel/weekly-sales/weekly-sales.component';
import { DashboardComponent } from './components/adminPanel/dashboard/dashboard.component';
import { AddItemComponent } from './components/adminPanel/add-item/add-item.component';
import { ItemsComponent } from './components/adminPanel/items/items.component';
import { ItemsEditDeleteComponent } from './components/adminPanel/items-edit-delete/items-edit-delete.component';
import { SDKBrowserModule } from './services/sdk';
import {FlexModule} from '@angular/flex-layout';
import { ThemeComponent } from './components/adminPanel/theme/theme.component';
import { ThemeFullComponent } from './components/adminPanel/theme-full/theme-full.component';
import { UserComponent } from './components/adminPanel/user/user.component';
import { UserFullComponent } from './components/adminPanel/user-full/user-full.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DataBoxComponent } from './components/adminPanel/data-box/data-box.component';
import { OrdersChartComponent } from './components/adminPanel/orders-chart/orders-chart.component';
import { SalesChartComponent } from './components/adminPanel/sales-chart/sales-chart.component';
import { TopFiveItemsComponent } from './components/adminPanel/top-five-items/top-five-items.component';
import { TopFiveThemesComponent } from './components/adminPanel/top-five-themes/top-five-themes.component';
import { MapsComponent } from './components/adminPanel/maps/maps.component';
import { MapsFullComponent } from './components/adminPanel/maps-full/maps-full.component';

const appRoutes: Routes= [
  {path:"", component:SigninComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"items",component:ItemsEditDeleteComponent},
  {path:"theme",component:ThemeFullComponent},
  {path:"users",component:UserFullComponent},
  {path:"maps",component:MapsFullComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NavbarComponent,
    WeeklySalesComponent,
    DashboardComponent,
    AddItemComponent,
    ItemsComponent,
    ItemsEditDeleteComponent,
    ThemeComponent,
    ThemeFullComponent,
    UserComponent,
    UserFullComponent,
    DataBoxComponent,
    OrdersChartComponent,
    SalesChartComponent,
    TopFiveItemsComponent,
    TopFiveThemesComponent,
    MapsComponent,
    MapsFullComponent
  ],
  imports: [
    FlexModule,
    NgxDatatableModule,
    TooltipModule,
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule, 
    CKEditorModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBk5WAnUcL7EAwKrogcPjanKaE6ZRgbvhQ'
    }),
    AgmJsMarkerClustererModule,
    SDKBrowserModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
