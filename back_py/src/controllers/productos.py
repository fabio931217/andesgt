from librerias import  *
from models.productos_model import ProductoModel
#Class para la gestión de productos
class Producto(Resource):

    parser = reqparse.RequestParser(bundle_errors=True) 
    parser.add_argument('nombre', location='json', type=str, required=True, help='El nombre es obligatorio')    
    parser.add_argument('descripcion',location='json', type=str, required=True,help='La descripción es obligatoria')    
    parser.add_argument('precio',location='json', type=float, required=True,help='El precio del producto es obligatorio')
    
    #Creamos un producto
    #@jwt_required()
    def post(self):
        try :
            data = Producto.parser.parse_args()
            now = datetime.now() # current date and time
            row = ProductoModel(data['nombre'], data['descripcion'], data['precio'],1,now,now,None)

            try:
                row.save_to_db()
            except Exception as e:
                return {"message": "Error al crear registros: "+ str(e), 'error':True}, 500
            
            return {'message': 'Registro creado', 'error':False}, 200
        except Exception as e:
            logging.error("Error al crear registros: "+ str(e))
            return {'message': 'Productos no creado  '+ str(e), 'error':True}, 404

    #Metodo que permita actualizar registros
    def put(self, id):
        try :
            data = Producto.parser.parse_args()
            row = ProductoModel.find_by_id(id)
            now = datetime.now() # current date and time

            if row is None:
                return {"message": "Registro no existe: "+ str(e), 'error':True}, 404
            else:
                row.nombre = data['nombre']
                row.descripcion = data['descripcion']
                row.precio = data['precio']
                row.updated_at = now
            try:
                row.save_to_db()
            except Exception as e:
                return {"message": "Error al actualizar el registro: "+ str(e),'error':True}, 500

            return {'message': 'Registro actualizado', 'error':False}, 200
        except Exception as e:
            logging.error("Error al actualizar registros: "+ str(e))
            return {'message': 'Error al actualizar registros  '+ str(e), 'error':True,}, 404
        
    #Metodo que permite eliminar o inactivar registros en base de datos
    def delete(self, id):
        try :
            row = ProductoModel.find_by_id(id)
            now = datetime.now() # current date and time

            if row is None:
                return {"message": "Registro no existe: ", 'error':True}, 404
            else:
                row.state = False
                row.deleted_at = now

            row.save_to_db()
            return {'message': 'Registro eliminado', 'error':False}, 200
        
        except Exception as e:
            logging.error("Error al eliminar registros: "+ str(e))
            return {'message': 'Error al actualizar registros  '+ str(e), 'error':True,}, 404

    #Metodo que permite la consultar un registro
    #@jwt_required()  # Token
    def get(self, id):
        item = ProductoModel.find_by_id(id)
        if item:
            return item.json()
        return {'message': 'Producto no encontrado', 'error':True,}, 404

#Class global para listar productos
class ProductoList(Resource):
    #@jwt_required()
    def get(self):
        try :
            #Paginación
            page = request.args.get("page", 1, type=int)
            per_page = request.args.get("perPage", 100, type=int)

            # Data
            data = ProductoModel.query.filter_by(state=True).paginate(page=page, per_page=per_page,error_out=False)
            results = {
                "data": [item.json() for item in data],
                "total": data.total,
                "last_page": data.pages,
                "page": page,
                "per_page": per_page
            }
            return results
        except Exception as e:
            logging.error("Error al obtener registros: "+ str(e))
            return {'message': 'Productos no encontrados'+ str(e), 'error':True,}, 404