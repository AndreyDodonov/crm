import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostionsFormComponent } from './postions-form.component';

describe('PostionsFormComponent', () => {
  let component: PostionsFormComponent;
  let fixture: ComponentFixture<PostionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
