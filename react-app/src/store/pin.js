const GET_PINS = "pins/getPins";

const getPins = (pins) => {
    return {
      type: GET_PINS,
      pins,
    };
  };

  export const allPinsThunk = () => async (dispatch) => {
    const res = await fetch("/api/pins/");
    const data = await res.json();
    dispatch(getPins(data));
    console.log('dataaaaa',data)
    return res;
  };

  const initialState = {};

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PINS:
     let newState = {} ;
      action.pins.pins.forEach((pin) => {
        console.log('#####',pin)
        newState[pin.id] = pin;
      });
      return newState;
    default:
      return state;
  }
};

export default pinReducer;
