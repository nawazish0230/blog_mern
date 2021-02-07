import { CREATE_POST, POST_FAILED, GET_POSTS, GET_POST, DELETE_POST, EDIT_POST, LIKE_POST, ADD_COMMENT, DELETE_COMMENT } from "../action/types";


const initialState = {
    post: null,
    loading: true,
    posts: null
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case CREATE_POST:
            return{
                ...state,
                post: payload,
                loading: false
            }
        case GET_POSTS:
            return{
                ...state,
                posts: payload,
                loading: false
            }
        case EDIT_POST:
            return{
                ...state,
                posts: [...state.posts.filter(post => post._id != payload._id),payload],
                loading: false
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case GET_POST:
            return{
                ...state,
                post: payload,
                loading: false
            }
        case LIKE_POST:
            return{
                ...state,
                post: payload,
                posts: state.posts.map(post => post._id === payload._id ? {...post, likes: payload.likes} : post),
                loading: false
            }
        case ADD_COMMENT:
            console.log(state.posts)
            return{
                ...state,
                post: payload,
                posts: state.posts.map(post => post._id === payload._id ? {...post, comments: payload.comments} : post),
                loading: false
            }
        case DELETE_COMMENT:
            // console.log(payload.comments)
            // console.log(state.post.comments.filter(comment => comment._id !== payload.comments._id))
            return{
                ...state,
                post: {
                    ...state.post,
                    comments: payload.comments
                },
                loading: false
            }
        case POST_FAILED:
            return{
                ...state,
                post: null,
                loading: false
            }
        default:
            return{
                ...state
            }
    }
}