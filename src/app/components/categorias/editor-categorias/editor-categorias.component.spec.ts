import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCategoriasComponent } from './editor-categorias.component';

describe('EditorCategoriasComponent', () => {
  let component: EditorCategoriasComponent;
  let fixture: ComponentFixture<EditorCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorCategoriasComponent]
    });
    fixture = TestBed.createComponent(EditorCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
