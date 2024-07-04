import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { routes } from '../app/app.routes';
@NgModule({
  imports:      [ BrowserModule, NgbModule, RouterModule.forRoot(
    routes,
    { enableTracing: true } // <-- debugging purposes only
  )],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }