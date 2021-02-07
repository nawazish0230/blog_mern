import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import axios from 'axios';
import {setAlert} from '../action/alert'
import setAuthToken from '../utils/setAuthToken';
axios.defaults.baseURL = process.env.REACT_APP_BE_URL || 'http://localhost:5000/';
// load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        // console.log(localStorage.token)
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/user/me')
        // console.log(res.data)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// register user
export const register =  ({name, email, password}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('/user/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// login user
export const login =  ({ email, password}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password})

    try {
        const res = await axios.post('/user/login', body, config)
        console.log(res.data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}