import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFunctionsComponent } from './edit-functions.component';

describe('EditFunctionsComponent', () => {
  let component: EditFunctionsComponent;
  let fixture: ComponentFixture<EditFunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
