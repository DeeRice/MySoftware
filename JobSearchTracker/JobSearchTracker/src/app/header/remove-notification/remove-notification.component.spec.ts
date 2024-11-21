import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveNotificationComponent } from './remove-notification.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RemoveNotificationComponent', () => {
  let component: RemoveNotificationComponent;
  let fixture: ComponentFixture<RemoveNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RemoveNotificationComponent, HttpClient, HttpHandler, {provide: ActivatedRoute, 
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
    
    fixture = TestBed.createComponent(RemoveNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
