import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoctawComponent } from './choctaw.component';

describe('ChoctawComponent', () => {
  let component: ChoctawComponent;
  let fixture: ComponentFixture<ChoctawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoctawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoctawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
