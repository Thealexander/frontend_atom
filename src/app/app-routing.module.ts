import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { EditorProductosComponent } from './components/productos/editor-productos/editor-productos.component';
import { ProductosComponent } from './components/productos/productos/productos.component';
const routes: Routes = [
  {path: '', component: ProductosComponent},
  {path:'add', component: EditorProductosComponent},
  {path:'edit/:id', component:EditorProductosComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
