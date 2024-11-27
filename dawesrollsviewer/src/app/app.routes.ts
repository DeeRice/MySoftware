import { Routes } from '@angular/router';
import { AllComponent } from './header/all/all.component';
import { HeaderComponent } from './header/header.component';
import { CherokeeComponent } from './header/cherokee/cherokee.component';
import { ChickasawComponent } from './header/chickasaw/chickasaw.component';
import { ChoctawComponent } from './header/choctaw/choctaw.component';
import { CreekComponent } from './header/creek/creek.component';
import { SeminoleComponent } from './header/seminole/seminole.component';

export const routes: Routes = [
    { path: 'app-header', component: HeaderComponent, children:[
        { path: '',redirectTo: 'app-header', pathMatch: 'full'},
        { path: 'app-all', component: AllComponent},
        { path: 'app-cherokee', component: CherokeeComponent},
        { path: 'app-chickasaw', component: ChickasawComponent},
        { path: 'app-chotaw', component: ChoctawComponent},
        { path: 'app-creek', component: CreekComponent},
        { path: 'app-seminole', component: SeminoleComponent}
    ]}

];
