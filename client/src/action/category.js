import { GET_CATEGORIES, CATEGORY_FAILED, GET_CATEGORIES_POSTS, CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY , EDIT_CATEGORY} from "./types";
import axios from 'axios';
import { setAlert } from './alert';
axios.defaults.baseURL = process.env.REACT_APP_BE_URL || 'http://localhost:5000/';

// get categories
export const getCategories = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get('/category/get-all-category', config)
        // console.log(res.data)
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: CATEGORY_FAILED
        })
    }
}

// get category by id
export const getCategory = id => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get(`/category/get-category/${id}`, config)
        // console.log(res.data)
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: CATEGORY_FAILED
        })
    }
}

// create category
export const createCategory = ({catname}, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({catname})

    try {
        const res = await axios.post('/category/create', body, config)
        console.log(res);
        dispatch({
            type: CREATE_CATEGORY,
            payload: res.data
        })
        history.push('/category');
        dispatch(setAlert('Category Added', 'success'))
    } catch (err) {
        console.log(err)
        dispatch({
            type: CATEGORY_FAILED
        })
    }
}

// edit category
export const editCategory = ({catname}, id, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({catname})

    try {
        const res = await axios.put(`/category/edit-category/${id}`, body, config)
        console.log(res);
        dispatch({
            type: EDIT_CATEGORY,
            payload: res.data
        })
        history.push('/category');
        // dispatch(setAlert('Category Updated', 'success'))
    } catch (err) {
        console.log(err)
        dispatch({
            type: CATEGORY_FAILED
        })
    }
}


// get posts category
export const getCategoryPosts = catname => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(catname);
    try {
        const res = await axios.get('/post/post-by-category?category=' + catname, config)
        // console.log(res.data)
        dispatch({
            type: GET_CATEGORIES_POSTS,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: CATEGORY_FAILED
        })
    }
}

// delete category
export const deleteCategory = catId => async dispatch => {
    console.log(catId);
    try {
        const res = await axios.delete(`/category/delete-category/${catId}`)
        console.log(res.data)
        dispatch({
            type: DELETE_CATEGORY,
            payload: res.data
        })
        dispatch(setAlert('Category removed', 'danger'))
    } catch (err) {
        console.log(err)
        dispatch({
            type: CATEGORY_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
