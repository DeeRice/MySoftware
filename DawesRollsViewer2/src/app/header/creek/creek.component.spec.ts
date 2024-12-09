import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreekComponent } from './creek.component';

describe('CreekComponent', () => {
  let component: CreekComponent;
  let fixture: ComponentFixture<CreekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
