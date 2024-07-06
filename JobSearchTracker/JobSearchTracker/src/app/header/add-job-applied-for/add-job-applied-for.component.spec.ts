import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobAppliedForComponent } from './add-job-applied-for.component';

describe('AddJobAppliedForComponent', () => {
  let component: AddJobAppliedForComponent;
  let fixture: ComponentFixture<AddJobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJobAppliedForComponent]
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
