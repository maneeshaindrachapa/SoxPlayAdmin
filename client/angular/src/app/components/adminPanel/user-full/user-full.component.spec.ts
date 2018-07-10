import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFullComponent } from './user-full.component';

describe('UserFullComponent', () => {
  let component: UserFullComponent;
  let fixture: ComponentFixture<UserFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
