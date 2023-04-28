import "./EditPinForm.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPinsThunk, editPinThunk } from "../../store/pin";
import { useModal } from "../../context/Modal";

const EditPinForm = ({ pin }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const pinId = pin.id;

  const [title, setTitle] = useState(pin.title);
  const [description, setDescription] = useState(pin.description);
  const [image_URL, setImageURL] = useState(pin.image_URL);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageURL = (e) => setImageURL(e.target.value);

  useEffect(() => {
    dispatch(allPinsThunk())
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pinId,
      title,
      description,
      image_URL,
    };

    
    const editedPin = await dispatch(editPinThunk(payload))
    if (!editedPin.id) {
      setErrors(editedPin);
    } else {
      closeModal()
    }
  };

  return sessionUser.id ? (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="errors">
          {errors.map((error, index) => (
            <li key={index}>Error: {error}</li>
          ))}
        </div>
        <div className="edit-pin-form-div">
        <p>Edit Pin:</p>

        <input className="edit-pin-form-inputs"
          type="text"
          placeholder="Pin title here"
          value={title}
          onChange={updateTitle}
          required
        />

        <textarea className="edit-pin-form-inputs"
          type="text"
          placeholder="Pin description here"
          value={description}
          onChange={updateDescription}
          required
        />

        <input className="edit-pin-form-inputs"
          type="text"
          placeholder="Image url here"
          value={image_URL}
          onChange={updateImageURL}
        />

        <div>
          <button className="edit-pin-button" type="submit">Edit Pin</button>
        </div>
        </div>
      </form>
    </section>
  ) : null;
};

export default EditPinForm;
