import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobComponent } from './edit-job.component';
import { JobService } from 'src/service/job.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('EditJobComponent', () => {
  let component: EditJobComponent;
  let fixture: ComponentFixture<EditJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [EditJobComponent, ActivatedRoute, JobService, HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
