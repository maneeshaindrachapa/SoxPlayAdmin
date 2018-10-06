import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveThemesComponent } from './top-five-themes.component';

describe('TopFiveThemesComponent', () => {
  let component: TopFiveThemesComponent;
  let fixture: ComponentFixture<TopFiveThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFiveThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFiveThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
