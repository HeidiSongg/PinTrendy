import "./CommentCard.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../store/comment";
import OpenModalButton from "../OpenModalButton";
import EditCommentForm from "../EditCommentForm";

const CommentCard = ({ comment }) => {
  const { pinId } = useParams();
  const userState = useSelector((state) => state.session);

  const dispatch = useDispatch();

  const editCommentInfo = () => {
    if (userState.user && comment && userState.user.id === comment.user.id) {
      return (
        <OpenModalButton
          buttonText="Edit Your Comment"
          modalComponent={
            <EditCommentForm comment={comment} pinId={pinId} />
          }
        />
      );
    }
  };

  const commentDeleter = () => {
    const confirm = window.confirm(
      `Are you sure you wish to delete your comment?`
    );
    if (confirm) {
      dispatch(deleteCommentThunk(pinId, comment))
    }
  };

  const deleteComment = (e) => {
    if (userState.user && comment && userState.user.id === comment.user.id) {
      return (
        <button
          onClick={() => {
            commentDeleter();
          }}
        >
          Delete Comment
        </button>
      );
    }
  };

  return (
    <div>
        <div className="comment-card">
        <img
            className="comment-user-img"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt=""
          />
            <span className="comment-username">{comment.user.username}</span> 
            <span>       </span>
            <span className="comment-body">{comment.body}</span>
            {editCommentInfo()}
            {deleteComment()}
            </div>

      </div>
  );
};

export default CommentCard;
