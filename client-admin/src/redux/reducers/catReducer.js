import axios from "axios";
import { URLDevelopment } from '../../helpers/url';

//Types
const GET_CAT_S = 'GET ALL CATEGORIES';
const GET_CAT_F = 'GET CATE FAIL';
const ADD_CAT = 'CAT ADD';
const UP_CAT = 'CAT UPDATED';
const DELETE_CAT = 'CAT DELETED';
const CAT_ERR = 'CAT ERROR';

// Intial State
const intialState = {
    categories: [],
    error: null,
  };

//Reducers
export default function (state = intialState, action){
    switch(action.type){

        case GET_CAT_S: return{...state, categories:[...action.payload]}
        case GET_CAT_F:
        case ADD_CAT: return{...state, categories:[...state.categories, action.payload ]}

        case UP_CAT: return {...state,
            categories: state.categories.map(c => c._id === action.payload._id ? action.payload : c)}

        case DELETE_CAT: return{...state,
            categories: state.categories.filter(c => c._id !== action.payload )}
        case CAT_ERR:
        default:
            return state;
    }
}

export const Fetch = () => axios.get(`${URLDevelopment}/api/category/all`);
export const UPC = (id, updated) => axios.put(`${URLDevelopment}/api/category/` + id, updated);
export const DLC = (id) => axios.delete(`${URLDevelopment}/api/category/` + id);

//Actions
export const getAllCat = () => (dispatch) => {
    Fetch()
    .then((res) => {
        console.log(res);
        dispatch({
            type: GET_CAT_S,
            payload: res.data,
        })
    })
    .catch(
        (err) =>
        console.log(err),
        CAT_ERR
    );
};

export const createSuccess = (data) => {
    return {
      type: ADD_CAT,
      payload: data,
    };
};

export const addCat = (category) => {
    const data ={ name : category.name }

    return(dispatch) => {
        return axios
        .post(`${URLDevelopment}/api/category`, data)
        .then((res) => {
            const data = res.data;
            console.log(data);

            const ndata = { name : data.name, };
            dispatch(createSuccess(ndata));
        }).catch((err) =>
            console.log(err),
            CAT_ERR
            );
    }
};

export const deleteCat = async(id, dispatch) => {
    DLC(id)
    .then((res) => {
        console.log(res);
        dispatch({
            type: DELETE_CAT,
            payload: id,
        });
    }).catch((err) => 
        console.log(err),
        CAT_ERR
    );
};

export const updateCat = (id, data) => (dispatch) => {
    UPC(id,data)
    .then((res) => {
        console.log(res);
        dispatch({
            type: UP_CAT,
            payload: res.data,
        });
    }).catch((err) => 
        console.log(err),
        CAT_ERR
    );
};


