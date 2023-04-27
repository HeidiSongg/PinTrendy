from flask import Blueprint, jsonify, redirect, render_template, request
from app.models import Pin, Comment,  db
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

@pin_routes.route('/new', methods=['POST'])
@login_required
def add_pins():
    """
    This function creates a new pin.
    """
    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        pin = Pin(
            title = form.title.data,
            description = form.description.data,
            image_URL = form.image_URL.data,
            user_id = current_user.id
        )
        db.session.add(pin)
        db.session.commit()
        return pin.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@pin_routes.route('/<int:pin_id>', methods=["GET"])
def pin(pin_id):
    """
    Query for one pin.
    """
    pin = Pin.query.get(pin_id)
    return pin.to_dict()

@pin_routes.route('/<int:pin_id>', methods=["PUT"])
@login_required
def edits_a_pin(pin_id):
    """
    Edits a pin by ID.
    """
    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        pin = Pin.query.get(pin_id)

        if pin is None:
            return {'errors': ['Pin not found']}, 404

        if pin.user_id != current_user.id:
            return {'errors': ['You are not authorized to edit this pin']}, 403

        pin.title = form.title.data
        pin.description = form.description.data
        pin.image_URL = form.image_URL.data

        db.session.commit()
        return pin.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@pin_routes.route('/<int:pin_id>', methods=["DELETE"])
def deletes_a_pin(pin_id):
    """
    Deletes a pin by ID.
    """
    pin = Pin.query.get(pin_id)
    db.session.delete(pin)
    db.session.commit()
    return {'message': 'Pin has been deleted!'}

@pin_routes.route('/<int:pin_id>/comments', methods=["GET"])
def comments(pin_id):
    """
    Query for all comments and returns them in a list of review dictionaries.
    """
    comments = Comment.query.filter(Comment.pin_id == pin_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}