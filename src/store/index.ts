import {combineReducers} from "redux";
import usersReducer from "../reducers/users";
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from 'redux';

const rootReducer = combineReducers({
    users: usersReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;

export type AppState = ReturnType<typeof rootReducer>