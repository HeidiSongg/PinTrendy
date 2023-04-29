const GET_COMMENTS_PIN = "pins/getCommentsByPinId";

const getCommentsByPinId = (comments) => {
    return {
      type: GET_COMMENTS_PIN,
      comments,
    };
  };

  export const allCommentsByPinIdThunk = (pinId) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pinId}/comments`);
    const data = await res.json();
    console.log('###',data.comments)
    dispatch(getCommentsByPinId(data.comments));
    return res;
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
      default:
        return state;
    }
  };
  
  export default commentReducer;
  