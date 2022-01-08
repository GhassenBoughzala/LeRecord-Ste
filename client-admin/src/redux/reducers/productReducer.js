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
  error: null,
};


//Reducers
export default function (state = intialState, action){

  switch (action.type) {

      case GET_PRODUCTS_F:
      case GET_PRODUCTS_S: return{...state, products:[...action.payload]}
      case GETP_DETAILS: return{...state, products:[...action.payload]}

      case ADDP_S: return{...state, products:[...state.products,action.payload ]}
      case ADDP_F:

      case PRODUCT_UPDATE: return{...state, 
        products: state.products.map(p => p._id === action.payload._id ? action.payload : p )}

      case PRODUCT_DELETE: return{...state, 
        products: state.products.filter(p => p._id !== action.payload )}

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

export const createSuccess = (data) => {
  return {
    type: ADDP_S,
    payload: data,
  };
};

export const addProduct = (product) => {
  const data = {
    name: product.name,
    description: product.description,
    price : product.price,
    quantity: product.quantity,
    category: product.category,
    fournisseur: product.fournisseur,
    shipping: product.shipping,
    photo: product.photo,
  };

  return(dispatch) => {

    return axios
    .post(`${URLDevelopment}/api/products`, data)
    .then((res) => {

      const data = res.data;
      console.log(data);

      const normalizedData = {
        name: data.name,
        description : data.description,
        price : data.price,
        quantity: data.quantity,
        category: data.category,
        fournisseur: data.fournisseur,
        shipping: data.shipping,                 
        photo: data.photo,
      };
      dispatch(createSuccess(normalizedData));

    }).catch((err) => 
      console.log(err),
      PRODUCT_ERR
    );

  };

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

export const updateProduct = (id, data) => (dispatch) => {
  UP(id, data)
  .then((res) => {
    console.log(res);
    dispatch({
      type: PRODUCT_UPDATE,
      payload: res.data,
    });
  }).catch((err) => 
    console.log(err),
    PRODUCT_ERR
  );
};
