import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin/signin.component';
import { NavbarComponent } from './components/adminPanel/navbar/navbar.component';

const appRoutes: Routes= [
  {path:"", component:SigninComponent},{path:"home",component:NavbarComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
