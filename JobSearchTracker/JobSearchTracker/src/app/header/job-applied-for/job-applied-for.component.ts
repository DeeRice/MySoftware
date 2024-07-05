import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CustomerService } from '../../../service/customer-service';
import { Customer, Representative } from '../../../model/customer';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/product-service';
import { Product } from '../../../model/product';
import { RouterLinkActive, ActivatedRoute, RouterModule, RouterLink, Router } from '@angular/router';
import { AppService } from '../../../service/app.service';
import { JobService } from 'src/service/job.service';

@Component({
  selector: 'app-job-applied-for',
  standalone: true,
  imports: [TableModule, 

 CommonModule, InputTextModule, TagModule, 
    DropdownModule, MultiSelectModule, ProgressBarModule, ToastModule, ButtonModule, 
    SliderModule,  FormsModule, RouterLink, RouterLinkActive, FormsModule],
    providers: [CustomerService, ProductService, AppService, JobService],
  templateUrl: './job-applied-for.component.html',
  styleUrl: './job-applied-for.component.scss'
})

export class JobAppliedForComponent {
    products!: Product[];
    public _appService?: AppService; 
    public _jobService?: JobService; 
    @Output() isHiddensChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private route: ActivatedRoute, private router: Router,
      private productService: ProductService, public appService: AppService, 
      jobService?: JobService) {
        this._appService = appService;
        this._jobService = jobService;
      }

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products = data;
        });
    }

    goToDetailPage(id: string) {
      this.router.navigate(['/app-job-details']);
      console.log(id);
    }   
 
}

