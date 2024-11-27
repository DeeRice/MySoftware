import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabViewModule, RouterOutlet],
  providers: [MessageService, ConfirmationService, /*AppService */ NgbModal, RouterModule, RouterOutlet,
    TabViewModule, ConfirmDialogModule,  RouterModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
