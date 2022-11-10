/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
//import { URLDevelopment } from '../../helpers/url';
import { toast } from "react-toastify";
import AuthToken from "../../helpers/authToken";

// Types
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const USER_LOADED = "USER_LOADED";
const AUTH_ERROR = "AUTH_ERROR";
const LOGOUT = "LOGOUT";
const SET_LOADING = "SET_LOADING";

// Intial State
const intialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: 0,
  role: null,
};

// Reducers
export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
        role: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // Set Token in localstorage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

// Actions
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    AuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/auth/getuser`);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ nom, prenom, email, password }) =>
  async (dispatch) => {
    // Config header for axios
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      nom,
      prenom,
      email,
      password,
    });

    dispatch({
      type: SET_LOADING,
    });
    try {
      // Response
      const res = await axios.post(`/api/auth/register`, body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => toast.error(error.msg));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    // Config header for axios
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Set body
    const body = JSON.stringify({
      email,
      password,
    });

    dispatch({
      type: SET_LOADING,
    });
    try {
      return axios
        .post(`/api/auth/login`, body, config)
        .then((res) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          });
          //console.log(res.data);
          dispatch(loadUser());
        })
        .catch((error) => {
          console.log(error.response.data.msg);
          //toast.warn(error.response.data.msg);
        });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => toast.error(error.msg));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
