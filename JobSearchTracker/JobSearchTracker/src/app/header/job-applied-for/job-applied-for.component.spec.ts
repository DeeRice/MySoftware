import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppliedForComponent } from './job-applied-for.component';
import { ActivatedRoute } from '@angular/router';

describe('JobAppliedForComponent', () => {
  let component: JobAppliedForComponent;
  let fixture: ComponentFixture<JobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [JobAppliedForComponent, ActivatedRoute]
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
