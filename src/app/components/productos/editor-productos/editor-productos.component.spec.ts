import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorProductosComponent } from './editor-productos.component';

describe('EditorProductosComponent', () => {
  let component: EditorProductosComponent;
  let fixture: ComponentFixture<EditorProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorProductosComponent]
    });
    fixture = TestBed.createComponent(EditorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
