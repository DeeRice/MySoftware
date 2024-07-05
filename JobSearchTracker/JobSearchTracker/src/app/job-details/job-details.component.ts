import { Component, EventEmitter, Output } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { routes } from '../app.routes';
import { RouterLinkActive, ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProductService } from '../../service/product-service';
import { Product } from '../../model/product';
import { Job } from '../../model/job';
import { HeaderComponent } from '../header/header.component';
import { JobService } from '../../service/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, RouterModule, HeaderComponent],
  providers: [ProductService, JobService],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  public titles!: string[];
  public job?: Job;
  public _jobService?: JobService;
  constructor(private route: ActivatedRoute, 
    private productService: ProductService, public jobService: JobService,
    private router: Router) {
     this._jobService = jobService;
     console.log();
    }
  products!: Product[];
  ngOnInit() {
   this.titles = ["Recruiter Company Name", "Client Company Name" , 
   "Job Location", "Job Title", "Job Description", "Recruiter Phone Number", 
   "Recruiter Name", "Recruiter Phone Number", "Recruiter Notes",
    "Client Phone Number" , "Client Notes" , "Date Of Submission" , 
    "Date of Follow Up", "Date of Interview"];
    this.productService.getProducts().then((data) => {
      this.products = data;
  });
  var id = new Number(1);
   // this._jobService?.getJobByID(id).then((data) => {
   //    this.job = data;
  //  });
 }
 goBackToJobGrid(){
  this.router.navigateByUrl("/app-header");
 }
}
