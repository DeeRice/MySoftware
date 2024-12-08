import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IndianDataService } from '../../service/indian-data-service';
import { AppService } from '../../service/app.service';
import { AllComponent } from './all/all.component';
import { CherokeeComponent } from './cherokee/cherokee.component';
import { ChickasawComponent } from './chickasaw/chickasaw.component';
import { ChoctawComponent } from './choctaw/choctaw.component';
import { CreekComponent } from './creek/creek.component';
import { SeminoleComponent } from './seminole/seminole.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabViewModule, RouterOutlet, FormsModule, AllComponent, CherokeeComponent, ChickasawComponent, ChoctawComponent, CreekComponent, SeminoleComponent],
  providers: [MessageService, ConfirmationService, NgbModal, RouterModule, RouterOutlet,
    TabViewModule, ConfirmDialogModule,  RouterModule, RouterOutlet, AllComponent, CherokeeComponent, ChickasawComponent, ChoctawComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public activeIndex = 0;
  isHidden?: boolean;
  _indianDataService?: IndianDataService;
  _appService: AppService;
  @ViewChild(AllComponent) allComponent?: AllComponent;
  @ViewChild(CherokeeComponent) cherokeeComponent?: CherokeeComponent;
  @ViewChild(ChickasawComponent) chickasawComponent?: ChickasawComponent;
  @ViewChild(ChoctawComponent) choctawComponent?: ChoctawComponent;
  @ViewChild(CreekComponent) creekComponent?: CreekComponent;
  @ViewChild(SeminoleComponent) seminoleComponent?: SeminoleComponent;
  public searchInput:string = "";
  constructor(private activatedRoute: ActivatedRoute, public appService: AppService,
    private messageService: MessageService, private router: Router,
    indianDataService: IndianDataService, private cd: ChangeDetectorRef) {
    this._appService = appService;
    this._indianDataService = indianDataService;
    this._appService.refreshTables.subscribe(
      (x) => { 
       this.refreshTables();
     });
    }

    ngOnInit() {
      this._appService.activeIndex.subscribe(
        (x) => { 
         this.activeIndex = x;
       });
    }

    public refreshTables() {
      this.allComponent?.refreshDataGrid(this.allComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
      this.cherokeeComponent?.refreshDataGrid(this.cherokeeComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
      this.chickasawComponent?.refreshDataGrid(this.chickasawComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
      this.choctawComponent?.refreshDataGrid(this.choctawComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
      this.creekComponent?.refreshDataGrid(this.creekComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
      this.seminoleComponent?.refreshDataGrid(this.seminoleComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
    }
  

  public filterGlobal(searchInput:string, filter: string, tabIndex:Number) {
      switch(tabIndex) {
        case 0:  this._appService.getFilterInputFromAllSearch(searchInput, filter);
                 break;
        case 1: this._appService.getFilterInputFromChoctawSearch(searchInput, filter); 
                 break;
        case 2:  this._appService.getFilterInputFromChickasawSearch(searchInput, filter);
                 break;
        case 3:  this._appService.getFilterInputFromCherokeeSearch(searchInput, filter);
                 break;
        case 4:  this._appService.getFilterInputFromCreekSearch(searchInput, filter);
                 break;
        case 5:  this._appService.getFilterInputFromSeminoleSearch(searchInput, filter);
                 break;
        default: break;
      }
  }
  public handleChange(event: TabViewChangeEvent) {
    const routingMap = [
      'app-all',
      'app-choctaw',
      'app-chickasaw',
      'app-cherokee',
      'app-creek',
      'app-seminole',
    ];
    this.router.navigate(['./', routingMap[event.index] ], {
      relativeTo: this.activatedRoute
    });
     this.activeIndex = event.index;

  }
}
