import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TareaService } from 'src/app/services/tareas.service';
import { TareasComponent } from "../tareas.component";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {

  itemForm: FormGroup = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    fecha_vence: new FormControl('')
  });
  titleModal:string = ''
  insert:boolean = false
  dataRow:any= []

  constructor(
    public itemRef:MatDialogRef<CrearTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private TareaService:TareaService
  ) { }

  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo de inicio
    * @param 
  */
  ngOnInit(): void {
    
    if(this.datos.op==2){
      this.titleModal = 'Editar Tarea'
    }else{
        this.titleModal = 'Crear Tarea'
        this.insert = true
    }
    this.createForm();
    this.getRow(this.datos.id);
  }
  
  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Creamos el formulario de uso
    * @param 
  */
  createForm(){
    this.itemForm = this.fb.group({
      titulo:['',Validators.required],
      descripcion:['',[Validators.required]],
      fecha_vence:['',[Validators.required]],
    })
  }

  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Consulta el registro a validar
    * @param 
  */
  getRow(id:number){
    this.TareaService.ver(id).subscribe((resp: any) => {
      this.dataRow = resp;
      this.itemForm.controls['titulo'].setValue(resp.titulo);
      this.itemForm.controls['descripcion'].setValue(resp.descripcion);
      this.itemForm.controls['fecha_vence'].setValue(resp.fecha_vence);
    });
  }

  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Guardamos la información en base de datos
    * @param 
  */

  guardarForm(form: FormGroup) {
    const data = {
      "titulo": form.value.titulo,
      "descripcion": form.value.descripcion,
      "id_estado": 1,
      "fecha_vence": form.value.fecha_vence
    };
    this.TareaService.guardar(data).subscribe((resp: any) => {
      Swal.fire("Registro creado!");
      this.itemRef.close(true);
    }, (error:any) => {
      Swal.fire({
        icon: "error",
        title:'Error al crear registro',
        text: 'Por favor validar información',
      });
    });
   

  }
  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Actualizamos la información en base de datos
    * @param 
  */
  actualizarForm(form: FormGroup) {
    const data = {
      "titulo": form.value.titulo,
      "descripcion": form.value.descripcion,
      "id_estado": 1,
      "fecha_vence": form.value.fecha_vence
    };
    this.TareaService.actualizar(this.datos.id,data).subscribe((resp: any) => {
      Swal.fire("Registro actualizado!");
      this.itemRef.close(true);
    }, (error:any) => {
      Swal.fire({
        icon: "error",
        title:'Error al actualizar registro',
        text: 'Por favor validar información',
      });
    });
   

  }
}
