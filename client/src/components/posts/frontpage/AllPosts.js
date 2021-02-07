import React from 'react'
import PropTypes from 'prop-types'
import postImg from '../../../images/post.jpg';
import { connect } from 'react-redux';
import Loader from '../../layout/Loader';
import Moment from 'moment';
import {Link } from 'react-router-dom';
let url = process.env.REACT_APP_BE_URL || 'http://localhost:5000/';

const AllPosts = ({post: {loading, posts}}) => {

    return loading ? <Loader/> : (
        <div className="posts-main-container">
          <div className="posts-header">
              <h6 className="title-header">All posts</h6>
          </div>
          {
            posts && posts.length > 0 ? posts.map(post => (
              <Link to={`post/${post._id}`} key={post._id}>
              <div className="posts-container">
                <div className="posts-img-container">
                  <img className="posts-img" src={`${url}${post.image}`}  alt=""/>
                </div>
                <div className="posts-text">
                  <div className="posts-heading">
                    <h5>{post.title.slice(0, 40) + '...'}</h5>
                  </div>
                  <div className="posts-content">
                    <p>{post.content.slice(0, 50) + '....'}</p>
                <h6 className="post-date-category">{post.category} | By {post.createdBy.name} , published at {new Date(post.createdAt).toDateString()}</h6>
                  </div>
                </div>
              </div>
          </Link>
            )) : <p className="no-cover">No cover photo</p>
          }
        </div>
    )
}

AllPosts.propTypes = {
  posts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps)(AllPosts);
