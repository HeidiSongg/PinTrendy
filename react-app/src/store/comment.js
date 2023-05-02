const GET_COMMENTS_PIN = "pins/getCommentsByPinId";
const ADD_COMMENT = "pins/addComment";
const EDIT_COMMENT = "pins/editComment";
const DELETE_COMMENT = "pins/deleteComment";

const getCommentsByPinId = (comments) => {
    return {
      type: GET_COMMENTS_PIN,
      comments,
    };
  };

  const addComment = (comment) => {
    return {
      type: ADD_COMMENT,
      comment,
    };
  };

  const editComment = (comment) => {
    return {
      type: EDIT_COMMENT,
      comment,
    };
  };
  
  const deleteComment = (comment) => {
    return {
      type: DELETE_COMMENT,
      comment,
    };
  };
  
  export const allCommentsByPinIdThunk = (pinId) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pinId}/comments`);
    const data = await res.json();
    dispatch(getCommentsByPinId(data.comments));
    return res;
  };

  export const makeCommentThunk = (pinId, comment) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pinId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const newComment = await res.json();
        dispatch(addComment(newComment));
        return newComment;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
};

export const editCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch(`/api/pins/${comment.pinId}/comments/${comment.commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
  
    if (res.ok) {
      const editedComment = await res.json();
      dispatch(editComment(editedComment));
      return editedComment;
    }
  };
  
  export const deleteCommentThunk = (pinId, comment) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}/comments/${comment.id}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      dispatch(deleteComment(comment));
    }
  };

  const initialState = {};

  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COMMENTS_PIN:
        let newState = {};
        action.comments.forEach((comment) => {
          newState[comment.id] = comment;
        });
        return newState;
        case ADD_COMMENT:
            let newAddCommentState = {...state};
            newAddCommentState[action.comment.id] = action.comment;
            return newAddCommentState;
        case EDIT_COMMENT:
            let newEditCommentState = {...state};
            newEditCommentState[action.comment.id] = action.comment;
            return newEditCommentState;
        case DELETE_COMMENT:
            let newDeleteCommentState = {...state};
            delete newDeleteCommentState[action.comment.id]
            return newDeleteCommentState;
        default:
            return state;
    }
  };
  
  export default commentReducer;
  