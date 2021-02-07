import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import Like from './Like'
import {connect} from 'react-redux';
import { getPost, deletePost } from '../../../action/post'
import Loader from '../../layout/Loader'
import { Link } from 'react-router-dom';
let url = process.env.REACT_APP_BE_URL || 'http://localhost:5000/';

const Post = ({getPost, match, post: {post, loading}, users: {user, isAuthenticated},loadingUser, deletePost, history}) => {

    useEffect(() => {
        getPost(match.params.id);
    }, [])

    const deleteHandler = (id) => {
        deletePost(id, history)
    }

    return loading ? <Loader /> : (
        post && post ? <div className="post-container">
        <div className="icon-container">
            <p><Link to="/" style={{display: 'flex'}}><i className="material-icons prefix">keyboard_backspace</i> Back</Link></p>
            {user && user._id && post && post.createdBy._id && post.createdBy._id === user._id ? (
                <div style={{display: 'flex'}}>
                <p className="red-color del-icon">
                    <i className="material-icons prefix" onClick={() => deleteHandler(post._id)}>delete</i>
                </p>
                <p className="edit-icon">
                    <Link to={`/post/edit/${post._id}`}><i className="material-icons prefix">edit</i></Link>
                </p>
            </div>
            ) : ''}
        </div>
        <h3 className="post-heading">{post.title}</h3>
    <p className="post-category">{post.category} | By {post.createdBy.name}</p>
        <img className="post-img" src={`${url}${post.image}`} alt="" />
        <p className="post-text">{post.content}</p>
        <Like likeNum={post.likes} />
        <CommentForm ></CommentForm>
    </div> : <Loader />
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
    users: state.auth,
    loadingUser: state.auth.loading,
})

export default connect(mapStateToProps, {getPost, deletePost})(Post);
