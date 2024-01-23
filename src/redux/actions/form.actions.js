import { GET_SUCCESS, GET_FAILURE } from "../../utils/ActionType";
import axios from "axios";

// returns action types
const formSuccess = (res) => {
  return {
    type: GET_SUCCESS,
    payload: res.data,
  };
};

const formFailure = (err) => {
  return {
    type: GET_FAILURE,
    payload: err,
  };
};

// Hitting end point with user info to login
export const getForm = (params) => {
  return (dispatch) => {
    axios
      .get(
        "https://plexaargateway-staging.findanexpert.net/customer_svc/pv/BusinessForms/getBusinessFormByBusinessId?businessId=1",
        params
      )
      .then((res) => {
        dispatch(formSuccess(res));
      })
      .catch((err) => {
        dispatch(formFailure(err.response.data.message));
      });
  };
};
