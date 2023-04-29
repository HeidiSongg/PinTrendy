import "./EditCommentForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCommentThunk } from "../../store/comment";
import { useModal } from "../../context/Modal";
import { useParams, useHistory } from "react-router-dom";

const EditCommentForm = ({ comment, pinId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const commentId = comment.id;
  const history = useHistory();

  const [body, setBody] = useState(comment.body);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const updateBody = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pinId,
      commentId,
      body
    };

    let editedComment = await dispatch(editCommentThunk(payload));
    if (editedComment && editedComment.id) {
    history.push(`/pins/${pinId}`)
    closeModal()
    } else {
    setErrors(editedComment);
    }
}

  return sessionUser.id ? (
    <form onSubmit={handleSubmit}>
      <div>
        {errors.map((error, index) => (
          <li key={index}>Error: {error}</li>
        ))}
      </div>
      <div className="edit-comment-modal">
        <p>Edit Your Comment:</p>
        <input
          type="text"
          placeholder={"Comment here"}
          value={body}
          onChange={updateBody}
          required
        />

        <div>
          <button className="edit-comment-button" type="submit">
            Edit Your Comment
          </button>
        </div>
      </div>
    </form>
  ) : null;
};

export default EditCommentForm;
