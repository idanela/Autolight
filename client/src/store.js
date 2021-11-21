import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {lightsListReducer} from './reducers/lightReducers';
import {userRegisterReducer, userSigninReducer} from './reducers/userReducers';
import {
    identifyWarningLightsInDashboardReducer,
    saveImgReducer,
    showResultsReducer
} from './reducers/identifyWarningLightsInDashboardReducer';


const userInfo = null
const initialState = {userSignin: {userInfo},};

const reducer = combineReducers({
    lightList: lightsListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    saveImg: saveImgReducer,
    identifyWarningLightsInDashboard: identifyWarningLightsInDashboardReducer,
    showIdentificationResults: showResultsReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
