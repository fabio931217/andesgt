import { Component , OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from 'src/app/services/tareas.service';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  dataSource = [];
  length = null;
  pageSize = 5;
  page = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['accion', 'titulo', 'descripcion','fecha_vence','estado'];
  formsCrm: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private TareaService: TareaService,
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
        this.TareaService.eliminar(id).subscribe((resp: any) => {
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
    this.TareaService.actualizar(id,data).subscribe((resp: any) => {
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
      this.TareaService.listar(page,pageSize).subscribe((resp: any) => {
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
		const dialogRef  = this.dialog.open(CrearTareaComponent, {
			width: '840px',
			disableClose: false,
			data: {id:id, op:op},
		});

    dialogRef.afterClosed().subscribe(result => {
      this.Listar(this.page, this.pageSize)
    });
	}

  
}
