import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine'; 
import { AddJobAppliedForComponent } from './add-job-applied-for.component';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/service/job.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AddJobAppliedForComponent', () => {
  let component: AddJobAppliedForComponent;
  let fixture: ComponentFixture<AddJobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AddJobAppliedForComponent, JobService, HttpClient, HttpHandler,  {provide: ActivatedRoute, 
        useValue: {
          snapshot: {
            queryParamMap: {
              get(): number {
                return 6;
              }
            }
          }
        }
      } ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJobAppliedForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
