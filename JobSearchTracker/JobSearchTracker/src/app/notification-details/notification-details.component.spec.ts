import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine'; 
import { NotificationDetailsComponent } from './notification-details.component';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/service/notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('NotificationDetailsComponent', () => {
  let component: NotificationDetailsComponent;
  let fixture: ComponentFixture<NotificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NotificationDetailsComponent, NotificationService, HttpClient, HttpHandler, {provide: ActivatedRoute, 
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

    fixture = TestBed.createComponent(NotificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
