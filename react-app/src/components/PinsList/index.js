// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { allPinsThunk } from "../../store/pin";
// import { Link } from "react-router-dom";
// import "./PinsList.css";

// const PinsList = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);

//   useEffect(() => {
//     dispatch(allPinsThunk()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   let pinsState = useSelector((state) => state.pin);

//   let PINS;
//   if (isLoaded) {
//     PINS = Object.values(pinsState);
//   }
//   return (
//     <>
//     <div className="pins-wrapper">
//       <div className="pins-list-grid" >
//         {PINS &&
//           PINS.map((pin) => (
//             <div
//                 className="pins-list-pins"
//                 key={pin.id}
//                 pin={pin}>
//                 <Link to={`/pins/${pin.id}`}>   
//                 <img
//                   className="pins-list-image"
//                   src={pin.image_URL}
//                   alt="img"
//                 />
//                 </Link> 
//             </div>
//           ))}
//       </div>
//       </div>
//     </>
//   );
// };

// export default PinsList;

/* PinsList.css */
  import { useSelector, useDispatch } from "react-redux";
  import { useEffect, useState } from "react";
  import { allPinsThunk } from "../../store/pin";
  import { Link } from "react-router-dom";
  import "./PinsList.css";
  
  const PinsList = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
  
    useEffect(() => {
      dispatch(allPinsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);
  
    let pinsState = useSelector((state) => state.pin);
  
    let PINS;
    if (isLoaded) {
      PINS = Object.values(pinsState);
    }
  
    return (
      <>
        <div className="pins-wrapper">
          <div className="pins-list-grid">
            {PINS &&
              PINS.map((pin) => (
                <div className="pins-list-pins" key={pin.id}>
                  <Link to={`/pins/${pin.id}`}>
                    <img
                      className="pins-list-image"
                      src={pin.image_URL}
                      alt="img"
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  };
  
  export default PinsList;
  