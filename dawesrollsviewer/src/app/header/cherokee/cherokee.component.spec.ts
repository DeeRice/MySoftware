import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CherokeeComponent } from './cherokee.component';

describe('CherokeeComponent', () => {
  let component: CherokeeComponent;
  let fixture: ComponentFixture<CherokeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CherokeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CherokeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
