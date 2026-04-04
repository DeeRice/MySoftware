import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IndianDataService } from '../../service/indian-data-service';
import { AppService } from '../../service/app.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Indian } from '../../model/indian';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-indian-details',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
    NgOptimizedImage
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './indian-details.component.html',
  styleUrls: ['./indian-details.component.scss']
})
export class IndianDetailsComponent {

  public indian$!: Observable<Indian>;

  constructor(
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private indianDataService: IndianDataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.indian$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        const tribe = this.activatedRoute.snapshot.queryParamMap.get('tribe');

        if (!id || !tribe) throw new Error('Missing id or tribe');

        const map: any = {
          Cherokee: this.indianDataService.getCherokeeIndianByID,
          Chickasaw: this.indianDataService.getChickasawIndianByID,
          Choctaw: this.indianDataService.getChoctawIndianByID,
          Creek: this.indianDataService.getCreekIndianByID,
          Seminole: this.indianDataService.getSeminoleIndianByID
        };

        return map[tribe]?.call(this.indianDataService, +id);
      }),
      map((data: any) => typeof data === 'string' ? JSON.parse(data) : data)
    );
  }

  goBackToIndianGrid() {
    this.appService.setActiveIndex(0);
    this.router.navigateByUrl("/app-header/app-choctaw");
  }

  returnPercentage(bloodPercentage: string): string {
    if (bloodPercentage === "full") return "100%";
    return this.calculateBloodPercentage(bloodPercentage);
  }

  calculateBloodPercentage(bloodPercentage: string): string {
    const len = bloodPercentage.length;
    if (len === 3) return this.processThreeCharacterBloodPercentage(bloodPercentage);
    if (len === 4) return this.processFourCharacterBloodPercentage(bloodPercentage);
    return "";
  }

  processThreeCharacterBloodPercentage(bloodPercentage: string): string {
    const arr = bloodPercentage.split('');
    let result = parseInt(arr[0]) / parseInt(arr[2]);
    result *= 100;
    return Number.isNaN(result) ? "N/A" : `${result}%`;
  }

  processFourCharacterBloodPercentage(bloodPercentage: string): string {
    const arr = bloodPercentage.split('');
    const result = (parseInt(arr[0]) / parseInt(bloodPercentage.substring(2, 3))) * 100;
    return Number.isNaN(result) ? "N/A" : `${result}%`;
  }

  displayUrl(url?: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url || "");
  }

  displayImage(url?: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url || "");
  }
}