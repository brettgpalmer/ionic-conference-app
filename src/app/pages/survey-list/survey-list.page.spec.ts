import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListPage } from './survey-list.page';

describe('SurveyListPage', () => {
  let component: SurveyListPage;
  let fixture: ComponentFixture<SurveyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
