import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AllComponent } from './header/all/all.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNGConfig } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { CherokeeComponent } from './header/cherokee/cherokee.component';
import { ChickasawComponent } from './header/chickasaw/chickasaw.component';
import { ChoctawComponent } from './header/choctaw/choctaw.component';
import { CreekComponent } from './header/creek/creek.component';
import { SeminoleComponent } from './header/seminole/seminole.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AllComponent, RouterModule, 
    AllComponent, CherokeeComponent, ChickasawComponent, ChoctawComponent, CreekComponent, SeminoleComponent],
  providers: [NgbModal, /* AppService */ RouterModule, RouterOutlet, CommonModule, RouterLink,
    RouterLinkActive, FormsModule, BrowserAnimationsModule, TableModule, PrimeNGConfig, CalendarModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dawesrollsviewer';
  public _httpClient?: HttpClient;
 // public _appSerive: AppService
  constructor(public modalService: NgbModal, //public appService: AppService,
  httpClient: HttpClient) {

    this._httpClient = this._httpClient;
    //this._appSerive = appService;
  }
}
