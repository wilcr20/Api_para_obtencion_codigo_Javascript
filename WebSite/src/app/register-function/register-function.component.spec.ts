import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFunctionComponent } from './register-function.component';

describe('RegisterFunctionComponent', () => {
  let component: RegisterFunctionComponent;
  let fixture: ComponentFixture<RegisterFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
