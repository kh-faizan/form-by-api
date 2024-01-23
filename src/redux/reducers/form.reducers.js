import { GET_SUCCESS, GET_FAILURE } from "../../utils/ActionType";

const initialState = {
  result: {},
  err: "",
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUCCESS: {
      return { result: action.payload.result };
    }

    case GET_FAILURE:
      return { err: action.payload };

    default:
      return state;
  }
};

export default formReducer;
