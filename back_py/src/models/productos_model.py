from librerias import  *

class ProductoModel(db.Model):
    __tablename__ = 'productos'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(145))
    descripcion = db.Column(db.String(2000))
    precio = db.Column(db.Double)
    state = db.Column(db.Integer)

    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    deleted_at = db.Column(db.DateTime)


    def __init__(self, nombre, descripcion, precio,state,created_at,updated_at,deleted_at):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.state = state
        self.created_at = created_at
        self.updated_at = updated_at
        self.deleted_at = deleted_at

    def format_date(fecha,format="%Y-%m-%d %H:%M:%S"):
        try:
            fecha = fecha.strftime(format)
            return fecha
        except:
            return None
        
    def json(self):
        if ( self.created_at ):
            self.created_at= ProductoModel.format_date(self.created_at)
        
        if ( self.updated_at ):
            self.updated_at= ProductoModel.format_date(self.updated_at)
        
        if ( self.deleted_at ):
            self.deleted_at= ProductoModel.format_date(self.deleted_at)
            
        return { 
                 'id': self.id,
                 'nombre': self.nombre,
                 'descripcion': self.descripcion,
                 'precio': self.precio,
                 'state': self.state,
                 'created_at': self.created_at,
                 'updated_at': self.updated_at,
                 'deleted_at': self.deleted_at 
                }

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()  # Tomamos un registro

    def save_to_db(self): 
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()