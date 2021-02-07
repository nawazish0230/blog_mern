import { CREATE_POST, POST_FAILED, GET_POSTS, GET_POST, DELETE_POST, EDIT_POST, LIKE_POST,ADD_COMMENT, DELETE_COMMENT} from './types';
import axios from 'axios';
import { setAlert } from './alert';
const fs = require('fs');
axios.defaults.baseURL = process.env.REACT_APP_BE_URL || 'http://localhost:5000/';

// create posts
export const createPost = ({title, content, category, file}, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(title, content, category, file)
    const formData = new FormData();
    formData.append('title', title)
    formData.append('content', content)
    formData.append('category', category)
    formData.append('image', file)
    if(!file){
        console.log('file')
        return dispatch(setAlert('Select Images', 'danger'))
    }
    // const body = JSON.stringify({title, content, category})
    // console.log(formData)
    console.log(...formData)
    // new Response(formData).text().then(console.log)

    try {
        const res = await axios.post('/post/create', formData , config)
        console.log(res);
        dispatch({
            type: CREATE_POST,
            payload: res.data
        })
        history.push('/')
    } catch (err) {
        const errors = err.response.data.errors;
        const error = err.response.data.msg;
        console.log(errors, error)
        if(error){
            dispatch(setAlert('Error while creating post', 'danger'))
        }else{
            errors.map(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: POST_FAILED
        })
    }
}

// edit posts
export const editPost = ({title, content, category, file},postId, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // const body = JSON.stringify({title, content, category})
    console.log(file);
    const formData = new FormData();
    formData.append('title', title)
    formData.append('content', content)
    formData.append('category', category)
    formData.append('image', file)
    console.log(...formData)
    try {
        const res = await axios.put(`/post/edit-post/${postId}`, formData, config)
        console.log(res.data);
        dispatch({
            type: EDIT_POST,
            payload: res.data
        })
        history.push('/')
    } catch (err) {
        // console.log(err.response.error)
        // const errors = err.response.data.errors;
        // errors.map(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
            type: POST_FAILED
        })
    }
}

// get posts
export const getPosts = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get('/post/get-all', config)
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_FAILED
        })
    }
}

// get a post
export const getPost = id => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get('/post/post/' + id, config)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_FAILED
        })
    }
}


// delete post
export const deletePost = (postId, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(postId);
    try {
        const res = await axios.delete(`/post/delete-post/${postId}`, config)
        console.log(res.data)
        dispatch({
            type: DELETE_POST,
            payload: res.data._id
        })
        history.push('/')
        dispatch(setAlert('post removed', 'danger'))
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// like posts
export const likePost = postId => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/post/like/${postId}`, config)
        // console.log(res.data.post);
        dispatch({
            type: LIKE_POST,
            payload: res.data.post
        })
    } catch (err) {
        console.log(err.response.data.msg)
        const error = err.response.data.msg
        console.log(error)
        if(error){
            dispatch(setAlert('Please login to like this post', 'danger'))
        }
        // dispatch({
        //     type: POST_FAILED
        // })
    }
}

// post comments
export const postComment = ({text}, postId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({text})

    try {
        const res = await axios.post(`/post/comment/${postId}`,body, config)
        console.log(res);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
    } catch (err) {
        // console.log(err.response)
        const errors = err.response.data.errors;
        const error = err.response.data.msg;
        if(error){
            dispatch(setAlert('Please login, before comment', 'danger'))
        }else{
            errors.map(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

// delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // console.log(postId, commentId)
    try {
        const res = await axios.delete(`/post/delete-comment/${postId}/${commentId}`, config)
        // console.log(res);
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')))
    }
}
