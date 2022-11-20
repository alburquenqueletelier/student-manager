from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# Rut, nombre, apellido, fecha de nacimiento, curso actual , email
class Student(db.Model):
    rut = db.Column(db.String(8), primary_key=True, autoincrement=False)
    name = db.Column(db.String(50), unique=False, nullable=False)
    last_name = db.Column(db.String(50), unique=False, nullable=False)
    birth_date = db.Column(db.DateTime)
    grade = db.Column(db.String(100), unique=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "rut": self.rut,
            "name": self.name,
            "last_name": self.last_name,
            "birth_date": self.birth_date,
            "grade": self.grade,
            "email": self.email,
            "is_active": self.is_active
        }