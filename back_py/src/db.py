from librerias import  *
#Conectamos a base de datos
load_dotenv() #Cargandos el archivo .env
DB_USERNAME =  urllib.parse.quote_plus( os.getenv("DB_USERNAME") )
DB_PASSWORD = urllib.parse.quote_plus( os.getenv("DB_PASSWORD") )
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_DATABASE = urllib.parse.quote_plus( os.getenv("DB_DATABASE") )
STORAGE = os.getenv("STORAGE")
JWT_SECRET = os.getenv("JWT_SECRET")
url_conexion = "mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE)

def conectar_db():  #Se conecta a base de datos, con conect y engine
    try:
        load_dotenv()
        DB_USERNAME =  urllib.parse.quote_plus( os.getenv("DB_USERNAME") )
        DB_PASSWORD = urllib.parse.quote_plus( os.getenv("DB_PASSWORD") )
        DB_HOST = os.getenv("DB_HOST")
        DB_PORT = os.getenv("DB_PORT")
        DB_DATABASE = urllib.parse.quote_plus( os.getenv("DB_DATABASE") )
        
        url="mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE)
        engine =  create_engine(url=url)
        return engine.connect()
    except Exception as e:
        logging.error("Error al conectar a la base de datos "+ str(e))
        return False

