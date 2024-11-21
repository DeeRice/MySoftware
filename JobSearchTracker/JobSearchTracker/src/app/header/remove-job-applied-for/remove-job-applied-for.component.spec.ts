import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveJobAppliedForComponent } from './remove-job-applied-for.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('RemoveJobAppliedForComponent', () => {
  let component: RemoveJobAppliedForComponent;
  let fixture: ComponentFixture<RemoveJobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RemoveJobAppliedForComponent, ActivatedRoute, HttpClient, HttpHandler]
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
