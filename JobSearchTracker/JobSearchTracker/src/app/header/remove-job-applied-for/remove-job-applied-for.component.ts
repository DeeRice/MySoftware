import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../service/product-service';
import { Product } from '../../../model/product';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { JobService } from '../../../service/job.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-remove-job-applied-for',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ConfirmDialogModule, ToastModule, 
    ],
  providers: [ProductService, JobService, ConfirmationService, MessageService],
  templateUrl: './remove-job-applied-for.component.html',
  styleUrl: './remove-job-applied-for.component.scss'
})
export class RemoveJobAppliedForComponent {
  public products!: Product[];
  public _jobService?: JobService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  constructor(private productService: ProductService, private jobService?: JobService,
    private messageService?: MessageService, private confirmationService?: ConfirmationService
  ) {
     this._jobService = jobService;
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
  this._jobService?.deleteJob(id);
}
  
}
