import React, {useState} from 'react'
import PropTypes from 'prop-types';
import User from '../../../images/images.png'
import { connect } from 'react-redux';
import { postComment, deleteComment } from '../../../action/post';
/* eslint-disable no-unused-expressions */
const CommentForm = ({postComment,deleteComment, post: {post}, users: {user, isAuthenticated}}) => {
    const [comment, setComment] = useState({text: ''})

    const { text } = comment

    const submitHandler = e => {
        e.preventDefault();
        postComment({text}, post._id)
        setComment({text: ''})
    }

    return (
        <div>
            {isAuthenticated ? (
                <>
            <h4>Add a Comment</h4>
            <form onSubmit={e => submitHandler(e)}>
            <div className="row">
                <div className="input-field col s12">
                    
                    <input 
                        id="comment" 
                        type="text" 
                        name="text"
                        value={text}
                        onChange={e => setComment({text: e.target.value})}
                    />
                    <label htmlFor="comment">Enter Comment</label>
                </div>
                <button className="waves-effect waves-light btn #42a5f5 blue lighten-1">Add Comment</button>
            </div>
            </form>
            <div className="comment-container">
                {
                    post && post.comments.map(comment => (
                        <div className="comment" key={comment._id}>
                            <img className="comment-user" src={User} alt=""/>
                            <div className="comment-text-container">
                                <p className="comment-text">{comment.text}</p>
                                <p className="comment-name">{comment.name}</p>
                            </div>
                            {user && user._id && comment && user._id === comment.postedBy ?  
                                <p className="red-color" onClick={() => deleteComment(post._id, comment._id)}><i className="del-comment material-icons prefix">delete</i></p>
                            : ''}
                        </div>
                    ))
                }
            </div>
            </>): <p className="centered login-text">please login to like or comment</p>}
            
        </div>
    )
}

CommentForm.propTypes = {
    postComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
    users: state.auth
})

export default connect(mapStateToProps, {postComment, deleteComment})(CommentForm)

