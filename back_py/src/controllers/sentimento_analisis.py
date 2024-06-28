from librerias import  *
#Class global para listar productos
class Sentimiento(Resource):
    #@jwt_required()
    def post(self):
        try :
            #Paginación
            text = request.args.get("text", '', type=str)
            results = sentiment.sentiment(text)
            #results = round(results)
            if (results>0):
                return {'message': 'Positivo', 'error':False, 'results':results}, 200
            else:
                return {'message': 'Negativo', 'error':False, 'results':results}, 200
        except Exception as e:
            logging.error("Error al realizar analisis: "+ str(e))
            return {'message': 'Error al realizar analisis:'+ str(e), 'error':True,}, 404