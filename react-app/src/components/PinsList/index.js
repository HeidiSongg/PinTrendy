import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { allPinsThunk } from "../../store/pin";
import "./PinsList.css";

const PinsList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(allPinsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let pinsState = useSelector((state) => state.pin);
  console.log('pinstate',pinsState)

  let PINS;
  if (isLoaded) {
    PINS = Object.values(pinsState);
  }
  console.log('PINSSSS',PINS)

  return (
    <>
      <div >
        {PINS &&
          PINS.map((pin) => (
            <div>
                <img
                  src={pin.imageURL}
                  alt="img"
                />
            </div>
          ))}
      </div>
    </>
  );
};

export default PinsList;
