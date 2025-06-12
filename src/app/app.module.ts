import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias/categorias.component';
import { EditorCategoriasComponent } from './components/categorias/editor-categorias/editor-categorias.component';
import { EditorProductosComponent } from './components/productos/editor-productos/editor-productos.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductosComponent,
    CategoriasComponent,
    EditorCategoriasComponent,
    EditorProductosComponent,



  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
