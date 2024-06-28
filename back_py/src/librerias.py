import os
import pytz

from flask import *
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse,request
#from flask_jwt_extended import jwt_required
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

import mysql.connector as mysql
import pymysql

import pandas as pd
from sqlalchemy import create_engine , text as sql_text, Table, Column, Integer, String, MetaData
import urllib.parse
import base64
import logging
from datetime import datetime, timedelta
from sentiment_analysis_spanish import sentiment_analysis
sentiment = sentiment_analysis.SentimentAnalysisSpanish()
#Logs y time de inicio
db = SQLAlchemy()
now = datetime.now() # current date and time
today = now.strftime("%m_%d_%Y")
filename='app.log'
logging.basicConfig(filename=filename, filemode='w', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
