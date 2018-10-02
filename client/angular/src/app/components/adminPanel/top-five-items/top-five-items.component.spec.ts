import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveItemsComponent } from './top-five-items.component';

describe('TopFiveItemsComponent', () => {
  let component: TopFiveItemsComponent;
  let fixture: ComponentFixture<TopFiveItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFiveItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiveItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
