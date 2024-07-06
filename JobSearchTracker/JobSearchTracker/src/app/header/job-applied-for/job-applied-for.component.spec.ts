import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppliedForComponent } from './job-applied-for.component';

describe('JobAppliedForComponent', () => {
  let component: JobAppliedForComponent;
  let fixture: ComponentFixture<JobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAppliedForComponent]
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
