import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveJobAppliedForComponent } from './remove-job-applied-for.component';

describe('RemoveJobAppliedForComponent', () => {
  let component: RemoveJobAppliedForComponent;
  let fixture: ComponentFixture<RemoveJobAppliedForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveJobAppliedForComponent]
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
