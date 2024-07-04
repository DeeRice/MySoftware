import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../service/product-service.service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-remove-notification',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  providers: [ProductService],
  templateUrl: './remove-notification.component.html',
  styleUrl: './remove-notification.component.scss'
})
export class RemoveNotificationComponent {
  products!: Product[];

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
        this.products = data;
    });
}

remove(id: string){
  console.log(id);
  }
  
}
