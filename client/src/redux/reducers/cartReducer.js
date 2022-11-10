/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { toast } from 'react-toastify';

//Types
const CART_ADD = 'CART ADD ITEM'
const CART_ADD_FAIL = 'FAIL TO ADD CART'
const CART_VIDE = 'CART VIDE'
const CART_REMOVE_ITEM = 'CART REMOVE ITEM'

//Initial State
const initialState ={
    cartItems: [],
    error: null
}

//Reducers 
export default function (state = initialState, action){
    switch(action.type){

        case CART_ADD:
            const item= action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
                }
            }else{
                return {...state, cartItems: [...state.cartItems, item]}
            } 
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        case CART_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CART_VIDE:
            return {
                ...state,
                cartItems: [],
                error: ''
            }
        default:
                return state;

    }
}

//Actions
export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    const { cart: { cartItems }, } = getState();
    if (cartItems.length > 0) {
      dispatch({
        type: CART_ADD_FAIL,
        payload: `Can't Add To Cart`,
      });
      toast.warn(`Panier vide !`);
    } else {
      dispatch({
        type: CART_ADD,
        payload: {
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          shipping: data.shipping,
          photo: data.photo,
          qty,
        },
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );

      toast.success(`Ajout avec succès !`);

    }
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };