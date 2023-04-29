import "./PinPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onePinThunk, deletePinThunk } from "../../store/pin";
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPinForm from "../EditPinForm";


const PinPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pinId } = useParams();

  useEffect(() => {
    dispatch(onePinThunk(pinId))
      .then(() => setIsLoaded(true));
  }, [dispatch, pinId]);

  let pinState = useSelector((state) => state.pin);
  let userState = useSelector((state) => state.session);
  
  let userId;
  if (userState.user) {
    userId = userState.user.id;
  }

  const payload = {
    pinId,
    userId,
  };

const editPinInfo = () => {
    if (
        userState.user &&
        userState.user.id === pinState[pinId].user.id
      ) 
      return (
        <OpenModalButton
          buttonText="Edit Your Pin"
          modalComponent={<EditPinForm pin={pinState[pinId]} />}
        />
      );
  };  
  
  const pinDeleter = () => {
    const confirm = window.confirm(
      `Are you sure you wish to delete the pin "${pinState[pinId].title}"?`
    );
    if (confirm) {
      dispatch(deletePinThunk(pinId)).then(() => {
        history.push("/")
      });
    }
  };

  const userDeletePin = () => {
    if (
      userState.user &&
      userState.user.id === pinState[pinId].user.id
    ) {
      return (
        <button
          onClick={() => {
            pinDeleter();
          }}
        >
          Delete Pin
        </button>
      );
    }
  };

  return (
    <div>
      {isLoaded && pinState[pinId] && (
        <>
          <img src={pinState[pinId].image_URL} alt="" />
          <div>{pinState[pinId].title}</div>
          <div>{pinState[pinId].description}</div>
          <h4>Comments</h4>
          {/* <div>{pinState[pinId].comments[2].body}</div> */}
          {editPinInfo()}
          {userDeletePin()}
        </>
      )}
    </div>
  );
};


export default PinPage;

