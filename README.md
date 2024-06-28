# andesgt

# Configuración de angular
1.	Instalar node
https://nodejs.org/en/download/prebuilt-installer

2.	Instalar Angular cli (En caso de no tenerlo) 
npm install -g @angular/cli

3.	Instalar librerías y el proyecto : ( Ejecutar comandos desde consola en la raíz del proyecto )
npm install

4.	Levantamos el front : ( Ejecutar comandos desde consola en la raíz del proyecto )
ng serve

El proyecto debe quedar ejecutando en la siguiente url : http://localhost:4200/

# Configurar back Python

3.	Instalar python
https://www.python.org/downloads/ 
4.	Creamos el entorno virtual: ( Ejecutar comandos desde consola en la raíz del proyecto )
python -m venv  venv
5.	Activamos el entorno: (Ejecutar comandos desde consola en la raíz del proyecto)
.\venv\Scripts\activate
6.	Instalamos librerías : ( Ejecutar comandos dentro del entorno virtual )
pip install flask 
pip install flask_cors 
pip install flask-sqlalchemy
pip install flask-restful
pip install python-dotenv
pip install pandas
pip install DateTime
pip install threaded
pip install pymysql
pip install pybase64
pip install PyJWT
pip install -U scikit-learn
pip install pysentimiento
pip install transformers
pip install mysql-connector-python
pip install SQLAlchemy

7.	Validamos instalacion
pip list
8.	Ejecutamos la app
python .\src\app.py

El sistema quedara activo en la siguiente ruta : http://127.0.0.1: 8001

# Configurar back PHP / MYSQL

1.	Instalar PHP usando un gestor
https://sourceforge.net/projects/wampserver/

2.	Instalar Composer
https://getcomposer.org/download/

3.	Activar back php

	Se debe crear y migrar la base de datos previamente ( Se adjuntan archivos sql para la migración )
	Ejecutar los siguientes comandos en la raíz de PHP
	Composer install
	php artisan serve
El sistema quedara activo en la siguiente ruta : http://127.0.0.1:8000
