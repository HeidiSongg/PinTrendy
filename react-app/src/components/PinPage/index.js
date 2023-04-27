import "./PinPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onePinThunk } from "../../store/pin";
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";


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

  
  console.log(pinState)
  return (
    <div>
      {isLoaded && pinState && (
        <>
          <img src={pinState[pinId].imageURL} alt="" />
          <div>{pinState[pinId].title}</div>
          <div>{pinState[pinId].description}</div>
          <h4>Comments</h4>
          {/* <div>{pinState[pinId].comments[2].body}</div> */}
        </>
      )}
    </div>
  );
};


export default PinPage;

