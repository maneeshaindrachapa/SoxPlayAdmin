import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeFullComponent } from './theme-full.component';

describe('ThemeFullComponent', () => {
  let component: ThemeFullComponent;
  let fixture: ComponentFixture<ThemeFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
