import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '../app/app.routes';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TabViewModule } from 'primeng/tabview';
import { SetNotificationComponent } from './header/set-notification/set-notification.component';
import { RemoveNotificationComponent } from './header/remove-notification/remove-notification.component';
import { RemoveJobAppliedForComponent } from './header/remove-job-applied-for/remove-job-applied-for.component';
import { JobAppliedForComponent } from './header/job-applied-for/job-applied-for.component';
import { AddJobAppliedForComponent } from './header/add-job-applied-for/add-job-applied-for.component';
import { ViewNotificationComponent } from './header/view-notification/view-notification.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { JobDetailsComponent } from './job-details/job-details.component';
import {FormsModule } from '@angular/forms';

@NgModule({
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive,
    FormsModule, BrowserModule, NgbModule,NgModule, AppComponent, RouterModule.forRoot(
    routes,
    { enableTracing: true } // <-- debugging purposes only
  )],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ],
  providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppModule { }