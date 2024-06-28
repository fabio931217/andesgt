import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { TareasComponent } from './tareas/tareas.component';

const routes: Routes = [

  { path: '', redirectTo: 'tareas', pathMatch: 'full'},
  { path: 'tareas', component: TareasComponent},
  { path: 'productos', component: ProductosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
