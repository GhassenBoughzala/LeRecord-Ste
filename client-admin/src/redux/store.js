import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import productsReducer from './reducers/productReducer'
import auth from './reducers/authReducer'
import userReducer from './reducers/userReducer'
import catReducer from './reducers/catReducer'
import forReducer from './reducers/forReducer'

const intialState = {}

const middleware = [thunk]

const rootReducer = combineReducers ({
    auth,
    productsReducer,
    userReducer,
    catReducer,
    forReducer
});

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;