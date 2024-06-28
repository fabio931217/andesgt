from librerias import  *
from pysentimiento import create_analyzer
import transformers
import pythoncom
#Class global para listar productos
class Sentimiento(Resource):
    #@jwt_required()
    def post(self):
        try :
            pythoncom.CoInitialize()
            analyzer = create_analyzer(task="sentiment", lang="es")
            text = request.args.get("text", '', type=str)
            results = analyzer.predict(text)
            if (results.output=='POS'):
                return {'message': 'Positivo', 'error':False}, 200
            else:
                return {'message': 'Negativo', 'error':False}, 200
        except Exception as e:
            logging.error("Error al realizar analisis: "+ str(e))
            return {'message': 'Error al realizar analisis:'+ str(e), 'error':True,}, 404