import { Routes } from '@angular/router';
import { SetNotificationComponent } from './header/set-notification/set-notification.component';
import { RemoveNotificationComponent } from './header/remove-notification/remove-notification.component';
import { RemoveJobAppliedForComponent } from './header/remove-job-applied-for/remove-job-applied-for.component';
import { JobAppliedForComponent } from './header/job-applied-for/job-applied-for.component';
import { AddJobAppliedForComponent } from './header/add-job-applied-for/add-job-applied-for.component';
import { ViewNotificationComponent } from './header/view-notification/view-notification.component';
import { HeaderComponent } from './header/header.component';
import { JobDetailsComponent } from './job-details/job-details.component';

export const routes: Routes = [
    { path: 'app-header', component: HeaderComponent },
    { path: 'app-job-details', component: JobDetailsComponent  },
    { path: 'app-job-details/:id', component: JobDetailsComponent  }
];

