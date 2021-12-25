import axios from 'axios';
import { URLDevelopment } from '../../helpers/url';

//Types
const GET_PRODUCTS_S = 'GET ALL PRODUCTS';
const GET_PRODUCTS_F = 'GET PRODUCTS FAILURE';
const GETP_DETAILS = 'GET PRODUCT DETAILS';
const ADDP_S = 'ADD PRODUCT SUCCESS';
const ADDP_F = 'ADD PRODUCT FAILURE';
const PRODUCT_UPDATE = 'PRODUCT UPDATED';
const PRODUCT_DELETE = 'PRODUCT DELETED';
const PRODUCT_ERR = 'PRODUCT ERROR';

// Intial State
const intialState = {
  products: [],
  isFetching: false,
  error: false,
};


//Reducers
export default function (state = intialState, action){

  switch (action.type) {

      case GET_PRODUCTS_F:
      case GET_PRODUCTS_S: return{...state, products:[...action.payload]}
      case GETP_DETAILS: return{...state, products:[...action.payload]}

      case ADDP_S: return{...state, 
        products:[...state.products,action.payload]}
      case ADDP_F:

      case PRODUCT_UPDATE: return{...state, 
        products: state.products.map(p => p._id == action.payload._id ? action.payload : p )}

      case PRODUCT_DELETE: return{...state, 
        products: state.products.filter(p => p._id != action.payload )}

      case PRODUCT_ERR:
        default:
          return state;

  }

}

export const Fetch = () => axios.get(`${URLDevelopment}/api/products/search`);
export const GetDetails = (id) => axios.get(`${URLDevelopment}/api/products/related/` + id);
export const AddP = () => axios.post(`${URLDevelopment}/api/products`);
export const UP = (id, updatedP) => axios.put(`${URLDevelopment}/api/products/` + id, updatedP);
export const DLP = (id) => axios.delete(`${URLDevelopment}/api/products/` + id);


//Actions
export const getAll =  () => (dispatch) => {

  Fetch()
  .then((res) => {
    console.log(res);
    dispatch({
      type: GET_PRODUCTS_S,
      payload: res.data,
    });
  })
  .catch(
    (err) => 
    console.log(err),
    GET_PRODUCTS_F
    );

};

export const getdetails =  async (id, product ,dispatch) => {

  try{
    // ID : 61c38a3a9494afc5b4d6a09b
    const res = await axios.get(`${URLDevelopment}/api/products/related/${id}`);
    dispatch({
      type: GETP_DETAILS,
      payload: res.data({id,product})
    })
    
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: GET_PRODUCTS_F,
    })
    
  }

};

export const addProduct = async (product, dispatch) => {
  try {
    const res = await axios.post(`${URLDevelopment}/api/products`, product);
    dispatch({
      type:  ADDP_S,
      payload: res.data
    })
    
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: ADDP_F
    })
    
  }

};

export const deleteProduct = async(id, dispatch) => {
  DLP(id)
  .then((res) => {
    console.log(res);
    dispatch({
      type: PRODUCT_DELETE,
      payload: id,
    });
  }).catch((err) => 
  console.log(err),
  PRODUCT_ERR
  );

};

export const updateProduct = async(id, dispatch ) => {
  try {
    const res = await axios.put(`${URLDevelopment}/api/products/${id}`)
    dispatch({
      type: PRODUCT_DELETE,
      payload: res.data(id)
    })
    
  } catch (error) {
    console.log(error.response)
    dispatch({ type: PRODUCT_ERR})
  }
};
