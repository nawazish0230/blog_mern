import React from 'react'
import PropTypes from 'prop-types'
import coverImg from '../../../images/cover.jpg'
import '../post.css'
import { getPosts } from '../../../action/post';
import { connect } from 'react-redux';
import Loader from '../../layout/Loader';
import { Link } from 'react-router-dom';
let url = process.env.REACT_APP_BE_URL || 'http://localhost:5000/';

const Cover = ({ posts, loading}) => {
    let post;
    if(posts){
        post = posts[posts.length - 1]
    }

    return loading ? <Loader /> : (posts  ? posts.length > 0 && (
        <Link to={`post/${post._id}`}>
            <div className="cover-container">
                <img className="cover-img" src={`${url}${post.image}`} alt=""/>
                <div className="cover-text-container">
                    <h6 className="cover-story-text">Cover Story</h6>
                    <h3 className="cover-heading">{post.title.slice(0, 50) + '...'}</h3>
                    <span className="cover-by">{post.createdBy.name} , {new Date(post.createdAt).toDateString()}</span>
                </div>
            </div>
        </Link>
    ) : <p className="no-cover">No cover photo</p>)

}

Cover.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}


export default connect(null, {getPosts})(Cover);
