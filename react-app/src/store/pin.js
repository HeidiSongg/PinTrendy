const GET_PINS = "pins/getPins";
const GET_ONE_PIN = "pins/getOnePin";
const ADD_PIN = "pins/addPin";
const EDIT_PIN = "pins/editPin";

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

const addPin = (pin) => {
    return {
      type: ADD_PIN,
      pin,
    };
  };

const editPin = (pin) => {
    return {
      type: EDIT_PIN,
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

export const makePinThunk = (pin) => async (dispatch) => {
    const res = await fetch("/api/pins/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pin),
    });
  
    if (res.ok) {
      const newPin = await res.json();
      dispatch(addPin(newPin));
      return newPin;
    } else if (res.status < 500) {
          const data = await res.json();
          if (data.errors) {
              return data.errors;
          }
      } else {
          return ["An error occurred. Please try again."];
      }
  };  

export const editPinThunk = (pin) => async (dispatch) => {
    const res = await fetch(`/api/pins/${pin.pinId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pin),
    });
  
    if (res.ok) {
      const pinEdited = await res.json();
      dispatch(editPin(pinEdited));
      return pinEdited;
    }
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
    case ADD_PIN:
      let newAddPinState = {}
      newAddPinState[action.pin.id] = action.pin;
      return newAddPinState;
    case EDIT_PIN:
        let newEditPinState = {}
        newEditPinState[action.pin.id] = action.pin;
        return newEditPinState;
    default:
      return state;
  }
};

export default pinReducer;
