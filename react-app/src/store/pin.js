const GET_PINS = "pins/getPins";
const GET_ONE_PIN = "products/getOnePin";

const getPins = (pins) => {
    return {
      type: GET_PINS,
      pins,
    };
  };

const getOnePin = (pin) => {
    return {
      type: GET_ONE_PIN,
      pin,
    };
  };

  export const allPinsThunk = () => async (dispatch) => {
    const res = await fetch("/api/pins/");
    const data = await res.json();
    dispatch(getPins(data));
    return res;
  };

  export const onePinThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/pins/${id}`);
    const data = await res.json();
    dispatch(getOnePin(data));
    return res;
  };  


const initialState = {};

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PINS:
      let newState = {};
      action.pins.pins.forEach((pin) => {
        newState[pin.id] = pin;
      });
      return newState;
    case GET_ONE_PIN:
      let newPinState = {};
        newPinState[action.pin.id] = action.pin;
        return newPinState;
    default:
      return state;
  }
};

export default pinReducer;
