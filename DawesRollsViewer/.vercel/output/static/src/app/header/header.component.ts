import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IndianDataService } from '../../service/indian-data-service';
import { AppService } from '../../service/app.service';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TabsModule,
    RouterOutlet
  ],
  providers: [
    MessageService,
    ConfirmationService,
    NgbModal
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public activeIndex = 0;
  isHidden = false;
  public searchInput = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    private messageService: MessageService,
    private router: Router,
    private indianDataService: IndianDataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.appService.activeIndex.subscribe((x) => {
      this.activeIndex = x;
    });
  }

  navigate(route: string, index: number) {
    this.activeIndex = index;
    this.router.navigate(['./', route], {
      relativeTo: this.activatedRoute
    });
  }

  public filterGlobal(searchInput: string, filter: string, tabIndex: number) {
    switch (tabIndex) {
      case 0:
        this.appService.getFilterInputFromAllSearch(searchInput, filter);
        break;
      case 1:
        this.appService.getFilterInputFromChoctawSearch(searchInput, filter);
        break;
      case 2:
        this.appService.getFilterInputFromChickasawSearch(searchInput, filter);
        break;
      case 3:
        this.appService.getFilterInputFromCherokeeSearch(searchInput, filter);
        break;
      case 4:
        this.appService.getFilterInputFromCreekSearch(searchInput, filter);
        break;
      case 5:
        this.appService.getFilterInputFromSeminoleSearch(searchInput, filter);
        break;
      default:
        break;
    }
  }
}