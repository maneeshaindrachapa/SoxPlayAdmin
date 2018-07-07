import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin/signin.component';
import { NavbarComponent } from './components/adminPanel/navbar/navbar.component';
import { WeeklySalesComponent } from './components/adminPanel/weekly-sales/weekly-sales.component';
import { DashboardComponent } from './components/adminPanel/dashboard/dashboard.component';
import {ToggleService}  from './services/toggle.service';
import { AddItemComponent } from './components/adminPanel/add-item/add-item.component';
import { ItemsComponent } from './components/adminPanel/items/items.component';
import { ItemsEditDeleteComponent } from './components/adminPanel/items-edit-delete/items-edit-delete.component';

const appRoutes: Routes= [
  {path:"", component:SigninComponent},{path:"dashboard",component:DashboardComponent},{path:"items",component:ItemsEditDeleteComponent}
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
    ItemsEditDeleteComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ToggleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
