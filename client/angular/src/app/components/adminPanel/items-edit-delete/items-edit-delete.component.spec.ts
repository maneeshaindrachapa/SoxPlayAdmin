import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsEditDeleteComponent } from './items-edit-delete.component';

describe('ItemsEditDeleteComponent', () => {
  let component: ItemsEditDeleteComponent;
  let fixture: ComponentFixture<ItemsEditDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsEditDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
