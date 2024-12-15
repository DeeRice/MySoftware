import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine'; 
import { RemoveJobAppliedForComponent } from './remove-job-applied-for.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('RemoveJobAppliedForComponent', () => {
  let component: RemoveJobAppliedForComponent;
  let fixture: ComponentFixture<RemoveJobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RemoveJobAppliedForComponent, HttpClient, HttpHandler,
        {provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              queryParamMap: {
                get(): number {
                  return 6;
                }
              }
            }
          }
        } 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveJobAppliedForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
