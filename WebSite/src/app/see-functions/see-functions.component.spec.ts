import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeFunctionsComponent } from './see-functions.component';

describe('SeeFunctionsComponent', () => {
  let component: SeeFunctionsComponent;
  let fixture: ComponentFixture<SeeFunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeFunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
