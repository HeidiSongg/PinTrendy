from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError


class CommentForm(FlaskForm):
    body = StringField('Enter review here', validators=[DataRequired()])
    submit = SubmitField('Submit')