from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename

image_routes = Blueprint('images', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

@image_routes.route('/', methods=['POST'])
def upload_image():
    """
    This function allows you to upload an image with AWS.
    """
    if 'image' not in request.files:
        return {'errors': 'Image required'}, 400

    image = request.files['image']

    if not allowed_file(image.filename):
        return {'errors': 'File type not permitted'}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']

    return {'url': url}