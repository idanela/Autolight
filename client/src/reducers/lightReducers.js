import * as constants from "../constants/lightConstants";
import {INIT_USER_INFO_ON_LOGIN} from "../constants/userConstants";


function lightsListReducer(state = {lights: [], favorites: []}, action) {
    switch (action.type) {
        case constants.LIGHT_LIST_REQUEST:
            return {
                loading: false,
                lights: [],
                favorites: [...state.favorites]
            };
        case  constants.LIGHT_FAVORITE_REQUEST:
            return {
                loading: false,
                lights: [...state.lights],
                favorites: [...state.favorites],
                errorMsg: null
            };

        case constants.LIGHT_LIST_SUCCESS:
            return {
                loading: false,
                lights: action.payload,
                favorites: [...state.favorites]
            };

        case constants.LIGHT_ADD_FAVORITE_SUCCESS:
            return {
                loading: false,
                lights: [...state.lights],
                favorites: [...state.favorites.concat(action.payload)]
            };
        case constants.LIGHT_REM_FAVORITE_SUCCESS:
            return {
                loading: false,
                lights: [...state.lights],
                favorites: [...state.favorites.filter((i) => i.WarningLightId != action.payload.WarningLightId)]
            };
        case constants.FAVORITE_LIST_REQUEST:
            return {loading: false};
        case INIT_USER_INFO_ON_LOGIN:
            return {
                loading: false,
                lights: [...state.lights],
                favorites: action.payload
            }
        case constants.FAVORITE_LIST_SUCCESS:
            return {
                loading: false,
                lights: [],
                favorites: action.payload
            };
        case constants.LIGHT_LIST_FAIL:
            return {loading: false, error: action.payload}
        case constants.LIGHT_LIST_DELETE:
            return {
                loading: false,
                lights: [...state.lights.filter((light) => light.Id !== action.payload[0].Id)],
                favorites: [...state.favorites]
            }
        case constants.LIGHT_LIST_ADD:
            return {
                loading: false,
                lights: [...state.lights.concat(action.payload)],
                favorites: [...state.favorites]
            };
        case constants.EDIT_WARNING_LIGHT:
            return {
                loading: false,
                lights: [...state.lights.filter((product) => product.Id !== action.payload[0].Id).concat(action.payload)],
                favorites: [...state.favorites]
            };
        default:
            return state;
    }
}

export {lightsListReducer}

