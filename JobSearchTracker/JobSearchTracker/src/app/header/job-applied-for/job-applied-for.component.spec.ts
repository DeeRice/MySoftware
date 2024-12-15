import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine'; 
import { JobAppliedForComponent } from './job-applied-for.component';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/service/notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('JobAppliedForComponent', () => {
  let component: JobAppliedForComponent;
  let fixture: ComponentFixture<JobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [JobAppliedForComponent, NotificationService, HttpClient, HttpHandler, {provide: ActivatedRoute, 
        useValue: {
          snapshot: {
            queryParamMap: {
              get(): number {
                return 6;
              }
            }
          }
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobAppliedForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
