import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminoleComponent } from './seminole.component';

describe('SeminoleComponent', () => {
  let component: SeminoleComponent;
  let fixture: ComponentFixture<SeminoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeminoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
