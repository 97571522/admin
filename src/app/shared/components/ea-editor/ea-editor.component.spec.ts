import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EaEditorComponent} from './ea-editor.component';

describe('EaEditorComponent', () => {
  let component: EaEditorComponent;
  let fixture: ComponentFixture<EaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EaEditorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
