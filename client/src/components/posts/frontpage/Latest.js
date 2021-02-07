import React from 'react'
import PropTypes from 'prop-types'
import postImg from '../../../images/post.jpg';
import { connect } from 'react-redux';
import Loader from '../../layout/Loader';
import {Link } from 'react-router-dom';
let url = process.env.REACT_APP_BE_URL || 'http://localhost:5000/';

const Latest = ({posts, loading}) => {

    return loading ? <Loader /> : (
        <div className="latest-container">
            <div className="latest-header">
                <h6 className="title-header">The Latest</h6>
            </div>
            <div className="latest-post-container">
                {
                    posts && posts.length > 0 ? posts.map(post => (
                        <Link to={`post/${post._id}`} key={post._id}>
                            <div className="latest-post" key={post._id}>
                                <img className="latest-img" src={`${url}${post.image}`} alt=""/>
                                <div className="latest-post-text">
                                    <p>{post.title.slice(0, 70) + '...'}</p>
                                    <p className="latest-category">{post.category}</p>
                                </div>
                            </div>
                        </Link>
                    )) : <p className="no-cover">No cover photo</p>
                }
            </div>
        </div>
    )
}

Latest.propTypes = {
    posts: PropTypes.array.isRequired,
}

// const mapStateToProps = state => ({
//     posts: state.post.posts
// })

export default connect(null)(Latest);
