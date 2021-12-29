import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import productsReducer from './reducers/productReducer'
import auth from './reducers/authReducer'

const intialState = {}

const middleware = [thunk]

const rootReducer = combineReducers ({
    auth,
    productsReducer
});

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;