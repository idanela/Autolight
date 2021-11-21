import {
    EDIT_WARNING_LIGHT,
    FAVORITE_LIST_REQUEST,
    FAVORITE_LIST_SUCCESS,
    LIGHT_ADD_FAVORITE_SUCCESS,
    LIGHT_LIST_ADD,
    LIGHT_LIST_DELETE,
    LIGHT_LIST_FAIL,
    LIGHT_LIST_REQUEST,
    LIGHT_LIST_SUCCESS,
    LIGHT_REM_FAVORITE_SUCCESS
} from "../constants/lightConstants"
import axios from 'axios';
import {INIT_USER_INFO_ON_LOGIN} from "../constants/userConstants";

const listLights = (filter = '') => async (dispatch) => {
    try {
        dispatch({type: LIGHT_LIST_REQUEST});
        // Get userName of connected user
        let userName = '';
        if (localStorage.getItem("signedUser")) {
            userName = JSON.parse(localStorage.getItem("signedUser")).Id;
        }
        const {data} = await axios.get("/api/lights?filter=" + filter, {params: {userName}});
        dispatch({type: LIGHT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: LIGHT_LIST_FAIL, payload: error.message});
    }
}

const listFavorites = () => async (dispatch) => {
    try {
        dispatch({type: FAVORITE_LIST_REQUEST});
        let userId = JSON.parse(localStorage.getItem("signedUser")).Id;
        const {data} = await axios.get("/api/favorites", {params: {userId}});
        dispatch({type: FAVORITE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: LIGHT_LIST_FAIL, payload: error.message});
    }
}

const addToFavoritesAction = (warningLightId) => async (dispatch) => {
    try {
        let userId = JSON.parse(localStorage.getItem("signedUser")).Id;
        const {data} = await axios.post("/api/favorites", {warningLightId, userId});
        dispatch({type: LIGHT_ADD_FAVORITE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: LIGHT_LIST_FAIL, payload: error.message});
    }
}
export const initFavoriteList = (userId) => async (dispatch) => {
    const favorites = await axios.get("/api/userSignin/signin", {params: {userId}});
    dispatch({type: INIT_USER_INFO_ON_LOGIN, payload: favorites.data});
}


const removeFromFavoritesAction = (warningLightId) => async (dispatch) => {
    try {
        let userId = JSON.parse(localStorage.getItem("signedUser")).Id;
        const {data} = await axios.delete("/api/favorites", {params: {warningLightId, userId}});
        dispatch({type: LIGHT_REM_FAVORITE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: LIGHT_LIST_FAIL, payload: error.message});
    }
}


const deleteWarningLight = (filter = '') => async (dispatch) => {
    try {
        const {data} = await axios.delete("/api/lights?filter=" + filter);
        deleteFromLocalStorage(String(data[0].Id));
        dispatch({type: LIGHT_LIST_DELETE, payload: data});

    } catch (error) {
        dispatch({type: LIGHT_LIST_FAIL, payload: error.message});
    }
}

const handleAddWarningLight = (gotoEndOfTable, name, explanation, recommendation, img, color, severity, isCommon) => async (dispatch) => {

    let formData = new FormData();
    formData.append("name", name);
    formData.append("severity", severity)
    formData.append("explanation", explanation);
    formData.append("recommendation", recommendation);
    formData.append("color", color);
    formData.append("isCommon", isCommon);
    formData.append("image", img);

    try {
        const {data} = await axios.post("/api/lights", formData, {headers: {'Content-Type': 'multipart/form-data'}});
        dispatch({type: LIGHT_LIST_ADD, payload: data});
        gotoEndOfTable();
    } catch (error) {
        dispatch({type: LIGHT_LIST_FAIL, payload: error.message});
    }
}

const handleEditWarningLights = (id, name, explanation, recommendation, img, severity) => async (dispatch) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("severity", severity);
    formData.append("explanation", explanation);
    formData.append("recommendation", recommendation);
    formData.append("image", img);

    try {
        const {data} = await axios.put("/api/lights", formData, {headers: {'Content-Type': 'multipart/form-data'}});

        const updatedData = data.map((dataItem) => ({
            ...dataItem,
            displayImgPath: `${dataItem.displayImgPath}?lastChangeTime=${Date.now()}`
        }))
        dispatch({type: EDIT_WARNING_LIGHT, payload: updatedData});
    } catch (error) {
        dispatch({type: LIGHT_LIST_FAIL, payload: error.message});
    }
}

const deleteFromLocalStorage = (deletedIdStr) => {
    // let isDeleted;
    let currKey;
    let keysToDelete = [];

    // for (currKey in localStorage) {
    // isDeleted=false;
    for (let i = 0; i < localStorage.length; i++) {
        currKey = localStorage.key(i);
        if (currKey !== "signedUser") {
            let currResultsIds = JSON.parse(localStorage[currKey]).resultIds;
            if (currResultsIds.includes("'" + deletedIdStr + "'"))
                keysToDelete.push(currKey);
        }
    }

    for (let j = 0; j < keysToDelete.length; j++) {
        currKey = keysToDelete[j];
        localStorage.removeItem(currKey);
    }
}

export {
    listLights, addToFavoritesAction, removeFromFavoritesAction, listFavorites,
    deleteWarningLight, handleAddWarningLight, handleEditWarningLights
}
