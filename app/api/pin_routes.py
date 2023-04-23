from flask import Blueprint, jsonify, redirect, render_template, request
from app.models import Pin,  db
from ..forms.pin_form import PinForm
from flask_login import current_user
from flask_login import login_required

pin_routes = Blueprint('pins', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@pin_routes.route('/', methods=["GET"])
def pins():
    """
    Query for all pins and returns them in a list of pin dictionaries.
    """
    pins = Pin.query.all()

    return {'pins': [pin.to_dict() for pin in pins]}

@pin_routes.route('/<int:pin_id>', methods=["GET"])
def product(pin_id):
    """
    Query for one pin.
    """
    pin = Pin.query.get(pin_id)
    return pin.to_dict()