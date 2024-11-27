import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChickasawComponent } from './chickasaw.component';

describe('ChickasawComponent', () => {
  let component: ChickasawComponent;
  let fixture: ComponentFixture<ChickasawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChickasawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChickasawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
