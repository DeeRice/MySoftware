import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobAppliedForComponent } from './add-job-applied-for.component';
import { ActivatedRoute } from '@angular/router';

describe('AddJobAppliedForComponent', () => {
  let component: AddJobAppliedForComponent;
  let fixture: ComponentFixture<AddJobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AddJobAppliedForComponent, ActivatedRoute]
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
