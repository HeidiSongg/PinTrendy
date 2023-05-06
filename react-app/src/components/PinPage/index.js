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
         className="pin-page-delete-button"
          buttonText="Edit"
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
        className="pin-page-delete-button"
          onClick={() => {
            pinDeleter();
          }}
        >
          Delete
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
        <div className="pin-card">
            <div className="pin-container">
            <div className="image-container">
                <img src={pinState[pinId].image_URL} alt="" />
            </div>
            <div className="pin-buttons">
                {editPinInfo()}
                {userDeletePin()}
            </div>
         <div className="text-container">
            <h2>{pinState[pinId].title}</h2>
            <p>{pinState[pinId].description}</p>
        <h4>Comments</h4>
        <div className = "pin-comments">
        {individualCommentArr.length > 0 &&
            individualCommentArr.map((comment) => {
            return <CommentCard key={comment.id} comment={comment} />;
            })}
            </div>
            <div>{userAddComment()}</div>
    </div>
  </div>
</div>

        </>
      )}
    </div>
  );
};


export default PinPage;