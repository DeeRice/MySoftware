import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../service/product-service.service';
import { Product } from '../../../model/product';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../../service/notification.service'
@Component({
  selector: 'app-remove-notification',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ConfirmDialogModule, ToastModule,
  NotificationService],
  providers: [ProductService],
  templateUrl: './remove-notification.component.html',
  styleUrl: './remove-notification.component.scss'
})
export class RemoveNotificationComponent {
  products!: Product[];
  _notificationService?: NotificationService;

  constructor(private productService: ProductService, private notificationService: NotificationService) {
    this._notificationService = notificationService;
  }
  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
        this.products = data;
    });
}

remove(id: Number){
  console.log(id);
  this.notificationService.deleteNotification(id);
  }
  
}
