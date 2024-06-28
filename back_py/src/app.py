
from librerias import  *
from db import *
from controllers.productos import Producto,ProductoList
from controllers.sentimento_analisis import Sentimiento

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = url_conexion
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

__path__ = str(os.path.abspath(os.getcwd()))
storage = __path__+'/src/storage' #definimos la ruta del storage
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True) #Actiamos los cors

#Iniciamos al conexión
db.init_app(app)

##Route las apis
api.add_resource(ProductoList, '/api/v1/products/list',endpoint='v1/products/list' , methods=["GET"]) #Obtiene todos los eventos

api.add_resource(Producto, '/api/v1/products/show/<int:id>',endpoint='v1/products/show', methods=["GET"])
api.add_resource(Producto, '/api/v1/products/save',endpoint='v1/products/save', methods=["POST"])
api.add_resource(Producto, '/api/v1/products/update/<int:id>',endpoint='v1/products/update',methods=["PUT"])
api.add_resource(Producto, '/api/v1/products/delete/<int:id>',endpoint='v1/products/delete', methods=["DELETE"])

api.add_resource(Sentimiento, '/api/v1/sentimiento/analisis',endpoint='v1/sentimiento/analisis', methods=["POST"])



if __name__ == "__main__":
    app.run(debug=True, port=8001,threaded=True)