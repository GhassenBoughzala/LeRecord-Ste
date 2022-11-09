/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { toast } from "react-toastify";
//import { URLDevelopment } from '../../helpers/url';

//Types
const GET_PRODUCTS = "PRODUCTS LOADING";
const GET_PRODUCTS_S = "GET ALL PRODUCTS";
const GET_PRODUCTS_F = "GET PRODUCTS FAILURE";
const GETP_DETAILS = "PRODUCT DETAILS REQ ID";
const GETP_DETAILS_S = "PRODUCT DETAILS SECC";
const ADDP_L = "ADD PRODUCT LOADING";
const ADDP_S = "ADD PRODUCT SUCCESS";
const ADDP_F = "ADD PRODUCT FAILURE";
const PRODUCT_LOADING = "ACTION LOADING";
const PRODUCT_LOADING_UP = "ACTION UPDATE LOADING";
const PRODUCT_UPDATE = "PRODUCT UPDATED";
const PRODUCT_DELETE = "PRODUCT DELETED";
const PRODUCT_ERR = "PRODUCT ERROR";

// Intial State
const intialState = {
  products: [],
  product: {},
  error: null,
  ploader: false,
  updateLoader: false,
  addLoader: false,
  codemsg: null,
};

//Reducers
export default function (state = intialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: [], ploader: true };
    case GET_PRODUCTS_S:
      return { ...state, products: [...action.payload], ploader: false };
    case GET_PRODUCTS_F:
      return { ...state, error: true };

    case GETP_DETAILS:
      return { ...state, product: action.payload };
    case GETP_DETAILS_S:
      return { product: action.payload };
    case ADDP_L:
      return {
        ...state,
        codemsg: null,
        addLoader: true,
      };

    case PRODUCT_LOADING:
      return {
        ...state,
        codemsg: null,
        addLoader: true,
      };

    case ADDP_S:
      return {
        ...state,
        products: [...state.products, action.payload],
        codemsg: 1,
        addLoader: false,
      };
    case ADDP_F:

    case PRODUCT_LOADING_UP:
      return {
        ...state,
        codemsg: null,
        updateLoader: true,
      };

    case PRODUCT_UPDATE:
      return {
        ...state,
        codemsg: 1,
        updateLoader: false,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };

    case PRODUCT_DELETE:
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.payload),
      };

    case PRODUCT_ERR:
      return {
        ...state,
        codemsg: 0,
        updateLoader: false,
      };
    default:
      return state;
  }
}

export const Fetch = () => axios.get(`/api/products/search`);
export const GetDetails = (id) => axios.get(`/api/products/` + id);
export const AddP = () => axios.post(`/api/products`);
export const UP = (id, updatedP) => axios.put(`/api/products/` + id, updatedP);
export const DLP = (id) => axios.delete(`/api/products/` + id);

//Actions
export const getAll = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS });
  Fetch()
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS_S,
        payload: res.data,
      });
    })
    .catch((err) => GET_PRODUCTS_F);
};

export const detailsProduct = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: GETP_DETAILS_S,
      payload: res.data,
    });
    console.log(res);
  } catch (error) {
    dispatch({
      type: PRODUCT_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProduct = (product) => {
  const data = {
    name: product.name,
    description: product.description,
    category: product.category,
    fournisseur: product.fournisseur,
    shipping: product.shipping,
    photo: product.photo,
  };

  return (dispatch) => {
    dispatch({ type: ADDP_L });
    return axios
      .post(`/api/products`, data)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: ADDP_S,
          payload: data,
        });
      })
      .catch((err) => console.log(err.status), PRODUCT_ERR);
  };
};

export const deleteProduct = async (id, dispatch) => {
  DLP(id)
    .then((res) => {
      console.log(res);
      dispatch({
        type: PRODUCT_DELETE,
        payload: id,
      });
      toast.error(`Supprimé avec succès !`);
    })
    .catch((err) => console.log(err), PRODUCT_ERR);
};

export const updateProduct = (id, data) => (dispatch) => {
  dispatch({ type: PRODUCT_LOADING });
  UP(id, data)
    .then((res) => {
      //console.log(res);
      dispatch({
        type: PRODUCT_UPDATE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), PRODUCT_ERR);
};

//--------EDIT-V2
export const updateProductV2 = async (id, product) => {
  console.log(product);
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  if (product.pEditImages) {
    for (const file of product.pEditImages) {
      formData.append("pEditImages", file);
    }
  }

  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("quantity", product.quantity);
  formData.append("category", product.category._id);
  formData.append("fournisseur", product.fournisseur._id);
  formData.append("shipping", product.shipping);

  try {
    let res = UP(id, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
