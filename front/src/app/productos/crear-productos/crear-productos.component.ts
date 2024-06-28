import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosComponent } from "../productos.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {
  itemForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl('')
  });
  titleModal:string = ''
  insert:boolean = false
  dataRow:any= []

  constructor(
    public itemRef:MatDialogRef<ProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private fb:FormBuilder,
    private ProductosService:ProductosService
  ) { }

  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo de inicio
    * @param 
  */
  ngOnInit(): void {
    if(this.datos.op==2){
      this.titleModal = 'Editar Producto'
    }else{
        this.titleModal = 'Crear Producto'
        this.insert = true
    }
    this.createForm();
    this.getRow(this.datos.id);
    
  }

   /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Consulta el registro a validar
    * @param 
  */
   getRow(id:number){
    this.ProductosService.ver(id).subscribe((resp: any) => {
      this.dataRow = resp;
      this.itemForm.controls['nombre'].setValue(resp.nombre);
      this.itemForm.controls['descripcion'].setValue(resp.descripcion);
      this.itemForm.controls['precio'].setValue(resp.precio);

    });
  }
  
  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Creamos el formulario de uso
    * @param 
  */
  createForm(){
    this.itemForm = this.fb.group({
      nombre:['',Validators.required],
      descripcion:['',[Validators.required]],
      precio:['',[Validators.required]],
    })
  }

  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Guardamos la información en base de datos
    * @param 
  */

  guardarForm(form: FormGroup) {
    const data = {
      "nombre": form.value.nombre,
      "descripcion": form.value.descripcion,
      "precio": form.value.precio
    };
    this.ProductosService.guardar(data).subscribe((resp: any) => {
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
        "nombre": form.value.nombre,
        "descripcion": form.value.descripcion,
        "precio": form.value.precio
      };
      this.ProductosService.actualizar(this.datos.id,data).subscribe((resp: any) => {
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
