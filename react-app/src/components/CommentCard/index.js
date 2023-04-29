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
        <div>{comment.body}</div>
          <div>{comment.user.username}</div>
        <div>
          {editCommentInfo()}
          {deleteComment()}
        </div>
      </div>
  );
};

export default CommentCard;
