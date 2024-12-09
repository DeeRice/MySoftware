import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndianDetailsComponent } from './indian-details.component';

describe('IndianDetailsComponent', () => {
  let component: IndianDetailsComponent;
  let fixture: ComponentFixture<IndianDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndianDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndianDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
