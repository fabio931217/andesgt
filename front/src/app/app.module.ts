import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosComponent } from './productos/productos.component';
import { TareasComponent } from './tareas/tareas.component';
import { CrearTareaComponent } from './tareas/crear-tarea/crear-tarea.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import {CommonModule} from "@angular/common";
import { FormsModule ,ReactiveFormsModule  } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { CrearProductosComponent } from './productos/crear-productos/crear-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    TareasComponent,
    CrearTareaComponent,
    CrearProductosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatIconModule,
    HttpClientModule,
    MatDividerModule,
    MatInputModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [MatDatepickerModule,MatNativeDateModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
