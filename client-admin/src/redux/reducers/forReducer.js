import axios from "axios";
import { URLDevelopment } from '../../helpers/url';

//Types 
const GET_FOURNISSEUR = 'GET ALL FOURNISSEURS'
const GET_FAIL = 'GET-FAIL'
const ADD_FOURNISSEUR = 'ADD-FOURNISSEUR'
const UP_FOURNISSEUR = 'UPDATED-FOURNISSEUR'
const DEL_FOURNISSEUR = 'DELETED-FOURNISSEUR'
const ERR_FOURNISSEUR = 'ERROR-FOURNISSEUR'

//RAZ
const intialState = {
    fournisseurs: [],
    console: null,
};

//Reducers
export default function (state = intialState, action){
    switch(action.type){

        case GET_FOURNISSEUR: return{...state, fournisseurs:[...action.payload]}
        case GET_FAIL:

        case ADD_FOURNISSEUR: return{...state, 
                fournisseurs:[...state.fournisseurs, action.payload]}

        case UP_FOURNISSEUR: return{...state,
                fournisseurs: state.fournisseurs.map(f => f._id === action.payload._id ? action.payload : f)}
        case DEL_FOURNISSEUR: return{...state,
                fournisseurs: state.fournisseurs.filter(f => f._id !== action.payload)}
                
        case ERR_FOURNISSEUR:
        default:
            return state;
    }
}

//URLS
export const Fetch = () => axios.get(`${URLDevelopment}/api/fournisseurs/all`);
export const UPF = (id, updated) => axios.put(`${URLDevelopment}/api/fournisseurs/` + id, updated);
export const DLF = (id) => axios.delete(`${URLDevelopment}/api/fournisseurs/` + id);



//Actions
export const getAllFou = () => (dispatch) => {
    Fetch()
    .then((res) => {
        
        dispatch({
            type: GET_FOURNISSEUR,
            payload: res.data,
        })
    })
    .catch(
        (err) =>
        console.log(err),
        ERR_FOURNISSEUR
    );
};

export const createSuccess = (data) => {
    return {
      type: ADD_FOURNISSEUR,
      payload: data,
    };
};

export const addFou = (fournisseur) => {
    const data ={ 
        title : fournisseur.title,
        desc: fournisseur.desc,
        img: fournisseur.img,
        active: fournisseur.active
     }

    return(dispatch) => {
        return axios
        .post(`${URLDevelopment}/api/fournisseurs`, data)
        .then((res) => {
            const data = res.data;
            console.log(data);

            const ndata = { 
                title : data.title,
                desc: data.desc,
                img: data.img,
                active: data.active };
            dispatch(createSuccess(ndata));
        }).catch((err) =>
            console.log(err),
            ERR_FOURNISSEUR
            );
    }
};

export const deleteFou = async(id, dispatch) => {
    DLF(id)
    .then((res) => {
        console.log(res);
        dispatch({
            type: DEL_FOURNISSEUR,
            payload: id,
        });
    }).catch((err) => 
        console.log(err),
        ERR_FOURNISSEUR
    );
};

export const updateFou = (id, data) => (dispatch) => {
    UPF(id,data)
    .then((res) => {
        console.log(res);
        dispatch({
            type: UP_FOURNISSEUR,
            payload: res.data,
        });
    }).catch((err) => 
        console.log(err),
        ERR_FOURNISSEUR
    );
};

