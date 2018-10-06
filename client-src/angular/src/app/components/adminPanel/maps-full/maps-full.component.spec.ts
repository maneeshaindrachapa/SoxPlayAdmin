import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsFullComponent } from './maps-full.component';

describe('MapsFullComponent', () => {
  let component: MapsFullComponent;
  let fixture: ComponentFixture<MapsFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
