import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPosts } from '../../action/post'
import { getCategories } from '../../action/category'
import { withRouter, Link } from 'react-router-dom';
import Cover from './frontpage/Cover';
import Latest from './frontpage/Latest';
import './post.css'
import AllPosts from './frontpage/AllPosts';

const MainPage = ({ getPosts, post: {loading, posts}, getCategories, auth }) => {
    
    useEffect(() => {
        getPosts();
        getCategories()
    }, [getPosts, getCategories])
    // console.log(posts)

    return (
        <div className="main-page-container">
            <div className="header-container">
                <div className="cover-main-container">
                    <Cover  posts={posts} loading={loading} />
                </div>
                <div className="latest-main-container">
                    <Latest  posts={posts} loading={loading} />
                </div>
            </div>
            {/* <Trending /> */}
            <AllPosts posts={posts} />
            {
                auth && auth ? <div className="post-add-btn">
                <Link to="/create/post"><span className="btn-floating btn-large waves-effect waves-light red add-btn  #42a5f5 blue lighten-1"><i className="material-icons">add</i></span></Link>
                </div> : ''
            }
        </div>
    )
}

MainPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
    categories: state.category.categories,
    auth: state.auth.isAuthenticated
})

export default withRouter(connect(mapStateToProps, {getPosts, getCategories})(MainPage));
