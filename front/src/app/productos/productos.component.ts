import { Component , OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  dataSource = [];
  length = null;
  pageSize = 5;
  page = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['accion', 'nombre', 'descripcion','precio'];
  formsCrm: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private ProductosService: ProductosService,
  ) { }
 
  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo de inicio
    * @param 
  */
  ngOnInit(): void {
    this.Listar(1,5)
  }
  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo que permite leer la acción del paginador
    * @param 
  */
  pageEvent(event: any): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.Listar(this.page, this.pageSize)
  }
  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo que permite eliminar un registro
    * @param 
  */
  ConfirmEliminar(id: number, status: number) {
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Desea eliminar el registro seleccionado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProductosService.eliminar(id).subscribe((resp: any) => {
          this.Listar(this.page, this.pageSize)
        });
      }
    });
  } 
  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Api para listar los registros
    * @param 
  */
  Culminar(id: number, status: number): void {
    const data = {
      "id_estado": status
    };
    this.ProductosService.actualizar(id,data).subscribe((resp: any) => {
      this.Listar(this.page, this.pageSize)
    });
  }

  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Api para listar los registros
    * @param 
  */
  Reset() {
    console.log('fabio')
  }
  Listar( page: number, pageSize: number): void {
      this.ProductosService.listar(page,pageSize).subscribe((resp: any) => {
        this.dataSource = resp.data;
        this.length = resp.total;
      });
  }
  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo que permite activar el modal para crear registro
    * @param 
  */
  ActivarModal(id:number, op:number) {
		const dialogRef  = this.dialog.open(CrearProductosComponent, {
			width: '840px',
			disableClose: false,
			data: {id:id, op:op},
		});

    dialogRef.afterClosed().subscribe(result => {
      this.Listar(this.page, this.pageSize)
    });
	}
}
