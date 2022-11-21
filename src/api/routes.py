"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy import or_
from api.models import db, Student
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

## Student API CRUD ##

## Create Student ##
@api.route('/student/create', methods=['POST'])
def create_student():
    data = request.get_json()
    try:
        exist_student = db.session.query(Student).filter(or_(
            Student.rut==data["rut"],
            Student.email==data["email"],
        )).all()
        if exist_student:
            return jsonify({
                'message' :'Rut y/o Email en uso'
            }), 400
        new_student = Student()
        new_student.rut = data["rut"]
        new_student.name = data["name"].capitalize()
        new_student.last_name = data["last_name"].capitalize()
        new_student.birth_date = data["birth_date"]
        new_student.grade = data["grade"].capitalize()
        new_student.email = data["email"]
        new_student.is_active = True
        db.session.add(new_student)
        db.session.commit()
        return jsonify({
            'message': 'Alumno creado exitosamente'
        }), 200
    except Exception as error:
        print(error)
        return jsonify({
            'message': 'Algo salió mal. Recuerda completar campos obligatorios y vuelve a intentar'
        }), 500

## Read Student ##
@api.route('/student')
def get_student():
    rut = request.args.get('rut', None)
    name = request.args.get('name', None)
    last_name = request.args.get('last_name', None)
    grade = request.args.get('grade', None)
    email = request.args.get('email', None)
    if rut or name or last_name or grade or email:
        if rut:
            if len(rut) >= 7:
                try:
                    student = db.session.query(Student).filter_by(rut=rut).first()
                    return jsonify({
                        'students': [student.serialize()]
                    }), 200
                except:
                    return jsonify({
                        'message': f'No existe alumno con rut={rut}'
                    })
            else:
                return jsonify({
                    'message' : 'Rut Invalido'
                })
        if name:
            students = db.session.query(Student).filter_by(name=name)
            return jsonify({
                'students': [student.serialize() for student in students]
            }), 200
        if last_name:
            students = db.session.query(Student).filter_by(last_name=last_name)
            return jsonify({
                'students': [student.serialize() for student in students]
            }), 200
        if grade:
            students = db.session.query(Student).filter_by(grade=grade)
            return jsonify({
                'students': [student.serialize() for student in students]
            }), 200
        if email:
            student = db.session.query(Student).filter_by(email=email).first()
            return jsonify({
                'students': student.serialize()
            }), 200
    else:
        students = db.session.query(Student).all()
        return jsonify({
            'students': [student.serialize() for student in students]
        }), 200

## Edit Student ##
@api.route('/student/edit/<string:rut>', methods=['PUT'])
def edit_student(rut):
    data = request.get_json()
    if len(rut) < 8 or len(rut) > 9:
        return jsonify({
            'message': f'Rut invalido'
        }), 400
    try:
        student = db.session.query(Student).filter_by(rut=rut).first()
        if not student:
            return jsonify({
                'message': f'No existe alumno con rut={rut}'
            }), 400
        student.rut = data["rut"] or student.rut
        student.name = data["name"].capitalize() or student.name.capitalize()
        student.last_name = data["last_name"].capitalize() or student.last_name.capitalize()
        student.grade = data["grade"].capitalize() or student.grade.capitalize()
        student.birth_date = data["birth_date"] or student.birth_date
        student.email = data["email"] or student.email
        student.is_active = data["is_active"] or student.is_active
        db.session.commit()
        return jsonify({
            'message': 'Se edito alumno correctamente'
        }), 200
    except Exception as error:
        print(error)
        return jsonify({
            'message': f'Error, no se pudo editar alumno rut={rut}'
        }), 500

## Delete Student ##
@api.route('/student/delete/<string:rut>', methods=['DELETE'])
def delete_student(rut):
    if len(rut) < 8 or len(rut) > 9:
        return jsonify({
            'message': f'Rut invalido'
        }), 400
    try:
        student = db.session.query(Student).filter_by(rut=rut).first()
        if not student:
            return jsonify({
                'message': f'No existe alumno con rut={rut}'
            }), 400
        db.session.delete(student)
        db.session.commit()
        return jsonify({
            'message': f'Se elimino estudiante rut={rut}'
        }), 200
    except Exception as error:
        print(error)
        return jsonify({
            'message': 'No fue posible eliminar al alumno'
        }), 500