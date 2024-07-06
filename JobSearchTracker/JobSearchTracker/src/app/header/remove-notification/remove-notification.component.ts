import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../service/product-service';
import { Product } from '../../../model/product';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../../service/notification.service'
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-remove-notification',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ConfirmDialogModule, ToastModule],
  providers: [ProductService, NotificationService, MessageService, ConfirmationService],
  templateUrl: './remove-notification.component.html',
  styleUrl: './remove-notification.component.scss'
})
export class RemoveNotificationComponent {
 public products!: Product[];
 public _notificationService?: NotificationService;
 public _messageService?: MessageService;
 public _confirmationService?: ConfirmationService;
  constructor(private productService: ProductService, private notificationService: NotificationService,
    private messageService?: MessageService, private confirmationService?: ConfirmationService
  ) {
    this._notificationService = notificationService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
  }
  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
        this.products = data;
    });
}

remove(id: number){
  console.log(id);
  this.notificationService.deleteNotification(id);
  }
  
}
