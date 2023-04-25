from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import current_user
from app.models import Board,  db


board_routes = Blueprint('boards', __name__)

@board_routes.route('/<int:board_id>', methods=["GET"])
def boards(board_id):
    """
    Query for board by id and returns them in a list of board dictionaries.
    """
    board = Board.query.get(board_id)
    return board.to_dict()

