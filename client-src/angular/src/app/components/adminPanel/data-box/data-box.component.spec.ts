import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBoxComponent } from './data-box.component';

describe('DataBoxComponent', () => {
  let component: DataBoxComponent;
  let fixture: ComponentFixture<DataBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
