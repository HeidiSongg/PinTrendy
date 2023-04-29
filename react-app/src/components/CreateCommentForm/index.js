import "./CreateCommentForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeCommentThunk } from "../../store/comment";
import { useModal } from "../../context/Modal";


const CreateCommetForm = (pinId) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const updateBody = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      body,
    };

    const createdComment = await dispatch(makeCommentThunk(pinId.pinId, payload))
    if (!createdComment.id) {
      setErrors(createdComment);
    } else {
      closeModal()
    }
  };

  return sessionUser.id ? (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="create-comment-modal">
        <p>Write a Comment:</p>
        <input
          type="text"
          placeholder="Comment here"
          value={body}
          onChange={updateBody}
          required
        />

        <div>
          <button className="create-comment-button" type="submit">
            Create New Comment
          </button>
        </div>
      </div>
    </form>
  ) : null;
};

export default CreateCommetForm;