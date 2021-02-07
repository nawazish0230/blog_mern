import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCategoryPosts } from '../../action/category';
import { connect } from 'react-redux';
import Loader from '../layout/Loader';
import {Link } from 'react-router-dom';
let url = process.env.REACT_APP_BE_URL || 'http://localhost:5000/';

const CategoryPosts = ({match , getCategoryPosts, categoryPostsData: {loading, categoryPosts}}) => {
    let catName = match.params.category
    useEffect(() => {
        console.log(catName)
        getCategoryPosts(catName)
    }, [catName])

    // console.log(categoryPosts)

    return loading ? <Loader/> : (
        <div className="category-post-container">
            <div className="posts-main-container">
            {
                categoryPosts ? 
                categoryPosts.length && 
                categoryPosts.map(post => (
                <Link to={`post/${post._id}`} key={post._id}>
                <div className="posts-container" key={post._id}>
                    <div className="posts-img-container">
                    <img className="posts-img" src={`${url}${post.image}`} alt=""/>
                    </div>
                    <div className="posts-text">
                    <div className="posts-heading">
                        <h5>{post.title.slice(0, 40) + '...'}</h5>
                    </div>
                    <div className="posts-content">
                        <p>{post.content.slice(0, 40) + '....'}</p>
                        <h6 className="post-date-category">
                            {post.category} | By {post.createdBy.name} , published at 25/10/15
                        </h6>
                    </div>
                </div>
            </div>
            </Link>
            )) : <h5 className="no-post">No post in this category</h5>
            }
            </div>
        </div>
    )
}

CategoryPosts.propTypes = {
    getCategoryPosts: PropTypes.func.isRequired,
    categoryPostsData: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    categoryPostsData : state.category
})

export default connect(mapStateToProps,{getCategoryPosts})(CategoryPosts) 
