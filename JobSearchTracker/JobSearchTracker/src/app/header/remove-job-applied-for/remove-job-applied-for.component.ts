import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../service/product-service';
import { Product } from '../../../model/product';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { JobService } from '../../../service/job.service';

@Component({
  selector: 'app-remove-job-applied-for',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ConfirmDialogModule, ToastModule, 
    ],
  providers: [ProductService, JobService],
  templateUrl: './remove-job-applied-for.component.html',
  styleUrl: './remove-job-applied-for.component.scss'
})
export class RemoveJobAppliedForComponent {
  products!: Product[];
  _jobService?: JobService;
  constructor(private productService: ProductService, private jobService?: JobService) {
     this._jobService = jobService;
  }
  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
        this.products = data;
    });
}

remove(id: number){
  console.log(id);
  this._jobService?.deleteJob(id);
}
  
}
