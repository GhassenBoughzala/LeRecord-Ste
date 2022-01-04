import axios from 'axios';
import { URLDevelopment } from '../../helpers/url';

//Types
const GET_ALL_USERS = 'GET ALL USERS';
const GET_FAIL = 'GET_FAILURE';
const USER_UP = 'USER_UPDATE';
const USER_DEL = 'USER_DELETE';
const USER_ERR = 'USERS_ERROR';

//
// Intial State
const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    uslist: [],
};

// Reducers
export default function (state = intialState, action) {
    const { type } = action;

    switch (type) {

                case GET_ALL_USERS: 
                    return{...state, uslist:[...action.payload]}
                case USER_UP:
                    return{...state, 
                        uslist: state.uslist.map(u => u._id === action.payload._id ? action.payload : u)};
                case USER_DEL:
                    return{...state,
                        uslist: state.uslist.filter(u => u._id !== action.payload)}
                case USER_ERR:
                default:
                    return state;
    }
}

//URLS
export const ALL = () => axios.get(`${URLDevelopment}/api/users`);
export const UPS = (id, updatedUser) => axios.put(`${URLDevelopment}/api/users/` + id, updatedUser);
export const DELU = (id) => axios.delete(`${URLDevelopment}/api/users/` + id);

//Actions
export const getAllUsers = () => (dispatch) => {
    ALL()
    .then((res) => {
        console.log(res);
        dispatch({
            type: GET_ALL_USERS,
            payload: res.data,
        });
    })
    .catch(
        (err) =>
        console.log(err),
        GET_FAIL
    )
}

export const deleteUser = async(id, dispatch) =>{
    DELU(id)
    .then((res) => {
        console.log(res);
        dispatch({
            type: USER_DEL,
            payload: id,
        })
    }).catch((err) =>
    console.log(err),
    USER_ERR
    );
}

export const updateUser = (id,data) => (dispatch) => {
    UPS(id,data)
    .then((res) =>{
        console.log(res);
        dispatch({
            type: USER_UP,
            payload: res.data
        });
    }).catch((err) =>
        console.log(err),
        USER_ERR
    );

}


