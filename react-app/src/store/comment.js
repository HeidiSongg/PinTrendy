const GET_COMMENTS_PIN = "pins/getCommentsByPinId";
const ADD_COMMENT = "pins/addComment";

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
            let newAddCommentState = {};
            newAddCommentState[action.comment.id] = action.comment;
            return newAddCommentState;
      default:
        return state;
    }
  };
  
  export default commentReducer;
  