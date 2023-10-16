import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddWebsiteCategoryComponent} from './add-website-category.component';

describe('AddWebsiteCategoryComponent', () => {
  let component: AddWebsiteCategoryComponent;
  let fixture: ComponentFixture<AddWebsiteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWebsiteCategoryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddWebsiteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
