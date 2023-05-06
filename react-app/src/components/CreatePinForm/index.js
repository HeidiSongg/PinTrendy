import "./CreatePinForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPinsThunk,makePinThunk } from "../../store/pin";
import { useHistory } from "react-router-dom";

const CreatePinForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_URL, setImageURL] = useState("");
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageURL = (e) => setImageURL(e.target.value);

  useEffect(() => {
    dispatch(allPinsThunk());
  }, [dispatch]);

  let createdPin;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      image_URL,
    };

    createdPin = await dispatch(makePinThunk(payload))
    if (createdPin && createdPin.id) {
      history.push(`/pins/${createdPin.id}`)
    } else {
      setErrors(createdPin);
    }

  };


  const errorHandle = () => {
    if (errors.length > 0) {
      return (
        <div className='createPin-errors-container'>
          {errors.map((error, index) => (
            <li className='createPin-errors' key={index}>Error occurred - {error} </li>
          ))}
        </div>

      )
    }
  }


  return sessionUser.id ? (
    <div className = "create-pin-container">
    <section className="create-pin-form">
      <form onSubmit={handleSubmit}>
        {errorHandle()}

        <div className='createPin-field'>
          <div className='createPin-keys'>
          </div>
          <textarea
            className='createPin-input-title'
            type="text"
            rows='1'
            placeholder="Add your title"
            value={title}
            onChange={updateTitle}
          />
        </div>

        <div>{sessionUser.username}</div>

        <div className='createPin-field'>
        <div className='createPin-keys'>
          </div>
          <textarea
            className='createPin-input-description'
            type="text"
            rows = '1'
            placeholder="Tell everyone what your pin is about"
            value={description}
            onChange={updateDescription}
          />
        </div>


        <div className='createPin-field'>
        <div className='createPin-keys'>
          </div>
          <textarea
            className='createPin-input-image'
            type="text"
            rows = '1'
            placeholder="Image URL"
            value={image_URL}
            onChange={updateImageURL}
          />
        </div>

        <div className='createPin-save-container'>
          <button className='createPin-save' type="submit">Save</button>
        </div>
      </form>
    </section>
    </div>
  ) : null;
};

export default CreatePinForm;
