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
import { AddJobAppliedForComponent } from './header/add-job-applied-for/add-job-applied-for.component'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { JobDetailsComponent } from './job-details/job-details.component';
import {FormsModule } from '@angular/forms';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [AppComponent,RouterModule.forRoot([
    {path: 'app-header', component: HeaderComponent},
    {path: 'app-job-details', component: JobDetailsComponent}
]), RouterModule, BrowserAnimationsModule, TableModule, CommonModule, CalendarModule, NotificationDetailsComponent,
TranslateModule.forRoot(),],
  providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(withJsonpSupport()),
    RouterOutlet, TableModule, RouterModule, CommonModule, RouterLink, RouterLinkActive,FormsModule, BrowserModule, 
    NgbModule,NgModule, BrowserAnimationsModule, provideAnimations(), PrimeNGConfig, CalendarModule]
})

export class AppModule { }

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withJsonpSupport()), provideAnimations(), PrimeNGConfig, provideRouter(routes, withComponentInputBinding())]
});