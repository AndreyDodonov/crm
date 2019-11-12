import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsFormComponent } from './positions-form.component';

describe('PostionsFormComponent', () => {
  let component: PositionsFormComponent;
  let fixture: ComponentFixture<PositionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
