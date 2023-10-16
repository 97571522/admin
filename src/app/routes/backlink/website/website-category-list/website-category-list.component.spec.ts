import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WebsiteCategoryListComponent} from './website-category-list.component';

describe('WebsiteCategoryListComponent', () => {
  let component: WebsiteCategoryListComponent;
  let fixture: ComponentFixture<WebsiteCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebsiteCategoryListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WebsiteCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
