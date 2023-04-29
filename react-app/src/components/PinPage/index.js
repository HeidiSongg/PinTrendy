import "./PinPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onePinThunk, deletePinThunk } from "../../store/pin";
import { allCommentsByPinIdThunk } from "../../store/comment";
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditPinForm from "../EditPinForm";
import CreateCommetForm from "../CreateCommentForm";
import CommentCard from "../CommentCard";


const PinPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pinId } = useParams();

  useEffect(() => {
    dispatch(onePinThunk(pinId))
      .then(dispatch(allCommentsByPinIdThunk(pinId)))
      .then(() => setIsLoaded(true));
  }, [dispatch, pinId]);

  let pinState = useSelector((state) => state.pin);
  let userState = useSelector((state) => state.session);
  let commentState = useSelector((state) => state.comment);

  let userId;
  if (userState.user) {
    userId = userState.user.id;
  }

  const payload = {
    pinId,
    userId,
  };

  let individualCommentArr = [];

  if (isLoaded) {
    individualCommentArr = Object.values(commentState);
  }

    if (isLoaded) {
    individualCommentArr = individualCommentArr.filter((comment) => {
      if (comment.pin.id === parseInt(pinId)) {
        return Object.values(comment);
      }
    });
  }

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

  const userAddComment = () => {
      return (
        <OpenModalButton
          buttonText="Add a Comment"
          modalComponent={<CreateCommetForm pinId={pinId} />}
        />
      );
  };

  return (
    <div>
      {isLoaded && pinState[pinId] && individualCommentArr && (
        <>
          <img src={pinState[pinId].image_URL} alt="" />
          <div>{pinState[pinId].title}</div>
          <div>{pinState[pinId].description}</div>
          <h4>Comment</h4>
          {userAddComment()}
          {individualCommentArr.length > 0 &&
                individualCommentArr.map((comment) => {
                    return (
                        <CommentCard
                          key={comment.id}
                          comment={comment}
                        />
                      );
                })}
           <div>
            <br></br>
          {editPinInfo()}
          {userDeletePin()}
          </div>     
        </>
      )}
    </div>
  );
};


export default PinPage;