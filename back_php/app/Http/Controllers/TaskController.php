<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

use App\Models\TaskModel;

class TaskController extends Controller
{
    

    /*
     Función que retonar todos los registros listados
     @Fecha: 26-06-2024
     @Autor: Fabio Garcia
     
    */
    public function list(Request $request){
        try {            
          $data = TaskModel::select("*")->orderBy('id', 'asc'); 
          $data = $data->where('state',true); 

          $data = $request->perPage ? $data->paginate($request->get('perPage', 5)) : $data->get();

          return $this->successResponse($data);  

        } catch (\Throwable $th) {
            \Log::error($th);
            return $this->errorResponse('Ocurrió un error al consultar los registros', Response::HTTP_NOT_FOUND);
        }
    }
    
     /*
     Función que permite consultar un registro
     @Fecha: 26-06-2024
     @Autor: Fabio Garcia
     
    */
    public function show($id){
        try {            
           $data = TaskModel::find($id); 
           return $this->successResponse($data); 

         } catch (\Throwable $th) {
            \Log::error($th);
            return $this->errorResponse('Ocurrió un error al consultar los registros', Response::HTTP_NOT_FOUND);
        }
            
    }

    
    /*
     Función que permite eliminar un registro
     @Fecha: 26-06-2024
     @Autor: Fabio Garcia
     
    */
    public function delete($id){
       try {            
           
           $data = TaskModel::find($id); 
           if (!$data) {
                return $this->errorResponse("No existe el registro seleccionado", Response::HTTP_NOT_FOUND);
           }
           
           $data->deleted_at = date('Y-m-d H:i:s');
           $data->state = false;
           $data->update();

           return $this->successResponse( array("msg"=>"Se eliminó el registro") ); 
 
        } catch (\Throwable $th) {
            \Log::error($th);
            return $this->errorResponse('Ocurrió un error al eliminar el registro', Response::HTTP_NOT_FOUND);
        }
    }
    

    /*
     Función que permite actualizar registros
     @Fecha: 26-06-2024
     @Autor: Fabio Garcia
     
    */
    public function update($id,Request $request){
        try {            
          
           $data = TaskModel::find($id); 
           if (!$data) {
                return $this->errorResponse("No existe el registro seleccionado", Response::HTTP_NOT_FOUND);
           }

           $request->fecha_vence   = date_create($request->fecha_vence);
           $request->fecha_vence = date_format($request->fecha_vence, 'Y-m-d');

           $data->updated_at  = date('Y-m-d H:i:s');
           $data->titulo      = $request->titulo ?? $data->titulo ;
           $data->descripcion = $request->descripcion ?? $data->descripcion ;
           $data->fecha_vence = $request->fecha_vence ?? $data->fecha_vence ;
           $data->state       = $request->state ?? $data->state ;
           $data->id_estado   = $request->id_estado ?? $data->id_estado ;
           $data->update();

           return $this->successResponse( array("msg"=>"Se actualizó el registro") ); 

       } catch (\Throwable $th) {
            \Log::error($th);
            return $this->errorResponse('Ocurrió un error al actualizar el registro', Response::HTTP_NOT_FOUND);
        }
    }


    /*
     Función que permite guardar registros
     @Fecha: 26-06-2024
     @Autor: Fabio Garcia
     
    */
    public function save(Request $request){
        try {     


           $data_insert = $request->all();
           $data_insert['fecha_vence']   = date_create($request->fecha_vence);
           $data_insert['fecha_vence'] = date_format($data_insert['fecha_vence'], 'Y-m-d');

           $validated = Validator::make(
                $request->all(),
                [
                    'titulo'      => 'string|required',
                    'descripcion' => 'string|required',
                    'fecha_vence' => 'date|required',
                    'id_estado'   => 'integer|required'
                ],
            );

            //Check the validation
            if ($validated->fails()) {
                return $this->errorResponse(array("msg"=>"Error de validación de datos",'data'=>$validated->errors(),'error'=>true), Response::HTTP_NOT_FOUND);
            }

           $data = TaskModel::create($data_insert);
           return $this->successResponse( array("msg"=>"Se creó el registro",'data'=>$data,'error'=>false) ); 


         } catch (\Throwable $th) {
            \Log::error($th);
            return $this->errorResponse(array("msg"=>"'Ocurrió un error al guardar el registro'",'error'=>true), Response::HTTP_NOT_FOUND);
        }
    }



}

