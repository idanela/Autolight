import {combineReducers} from 'redux';
import {lightsListReducer} from './reducers/lightReducers';
import {userRegisterReducer, userSigninReducer} from './reducers/userReducers';
import {
    identifyWarningLightsInDashboardReducer,
    saveImgReducer,
    showResultsReducer
} from './reducers/identifyWarningLightsInDashboardReducer';

import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"


const persistConfig =
    {
        key: 'root',
        storage,
        whitelist: ['productList']
    };

export const rootReducer = combineReducers({
    productList: lightsListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    saveImg: saveImgReducer,
    identifyWarningLightsInDashboard: identifyWarningLightsInDashboardReducer,
    showIdentificationResults: showResultsReducer,
})

export default persistReducer(persistConfig, rootReducer);
