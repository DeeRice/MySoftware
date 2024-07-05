import { NgModule }      from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
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
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';



@NgModule({
  imports: [AppComponent,RouterModule.forRoot([
    {path: 'app-header', component: HeaderComponent},
    {path: 'app-job-details', component: JobDetailsComponent}
]), RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(withJsonpSupport()),
    RouterOutlet, RouterModule, CommonModule, RouterLink, RouterLinkActive,FormsModule, BrowserModule, 
    NgbModule,NgModule]
})

export class AppModule { }

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withJsonpSupport())]
});