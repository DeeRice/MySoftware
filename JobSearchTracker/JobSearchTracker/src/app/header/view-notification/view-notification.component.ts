import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../service/product-service.service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-view-notification',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  providers: [ProductService],
  templateUrl: './view-notification.component.html',
  styleUrl: './view-notification.component.scss'
})

export class ViewNotificationComponent {
  products!: Product[];

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
        this.products = data;
    });
}
}