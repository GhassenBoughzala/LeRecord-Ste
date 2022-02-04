import React, { useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import Container from '../components/container/container.component'
import Footer from '../components/home/Footer'
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/reducers/cartReducer";
import MessageBox from "../components/home/MessageBox";
import './loading.css';

const Cart = (props ,product, match, cartItems, error) => {

    
    const qty = props.location.search
      ? Number(props.location.search.split('=')[1])
      : 1;
    //const cart = useSelector((state) => state.cart);
    //const { cartItems, error } = cart;
    
    const {productId} = match.params;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
          dispatch(addToCart(productId, qty));
        }
      }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
      };
      

    return (
		<>
		<Container>	

        <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">

        <div className="flex flex-col items-center sm:px-5 md:flex-row bg-white lg:mx-8 lg:flex lg:max-w2xl lg:rounded-lg lg:shadow-lg">
            
        <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={`/uploads/${item.photo}`} 
                      alt={item.photo}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <button
                type="button"
                //onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

        </div>

        </section>

			
		</Container>
		<Footer/>
		</>

    )
};

const mapToStateProps = (state) => ({
    product: state.productsReducer.product,
    isAuth: state.auth.isAuthenticated,
    cartItems: state.cart.cartItems,
    error: state.cart.error
  });

export default connect(mapToStateProps)(Cart);
