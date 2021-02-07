import { GET_CATEGORIES, GET_CATEGORIES_POSTS, GET_CATEGORY, EDIT_CATEGORY } from "../action/types";
import { CATEGORY_FAILED, CREATE_CATEGORY, DELETE_CATEGORY } from './../action/types';

const initialState = {
    categories: null,
    loading: true,
    category: null,
    categoryPosts: null,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_CATEGORIES:
            return{
                ...state,
                categories: payload,
                loading: false
            }
        case GET_CATEGORY:
            return{
                ...state,
                category: payload,
                loading: false
            }
        case EDIT_CATEGORY:
            return{
                ...state,
                categories: [...state.categories.filter(category => category._id != payload._id),payload],
                loading: false
            }
        case CREATE_CATEGORY:
            return{
                ...state,
                categories: [payload, ...state.categories],
                loading: false
            }
        case DELETE_CATEGORY:
            return{
                ...state,
                categories: state.categories.filter(category => category._id != payload),
                loading: false
            }
        case GET_CATEGORIES_POSTS:
            return{
                ...state,
                categoryPosts: payload,
                loading: false
            }
        case CATEGORY_FAILED:
            return{
                ...state,
                categoryPosts: null,
                loading: false,
                category: null,
                error: payload
            }
        default:
            return{
                ...state
            }
    }
}