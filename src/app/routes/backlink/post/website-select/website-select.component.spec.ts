import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WebsiteSelectComponent} from './website-select.component';

describe('WebsiteSelectComponent', () => {
  let component: WebsiteSelectComponent;
  let fixture: ComponentFixture<WebsiteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebsiteSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WebsiteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
