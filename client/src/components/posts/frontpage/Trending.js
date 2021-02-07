import React from 'react'
// import PropTypes from 'prop-types'
import postImg from '../../../images/post.jpg'

const Trending = props => {
    return (
        <div className="trending-container">
            <div className="trending-header">
                <h6>Trending</h6>
            </div>
            <div className="trending-post-container">
                <div className="trending-post">
                    <img className="trending-img" src={postImg} alt=""/>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem beatae eius ducimus facere, ea magni aliquid, consectetur epe.</p>
                </div>
                <div className="trending-post">
                    <img className="trending-img" src={postImg} alt=""/>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem beatae eius ducimus facere, ea magni aliquid, consectetur  saepe.</p>
                </div>
                <div className="trending-post">
                    <img className="trending-img" src={postImg} alt=""/>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem beatae eius ducimus facere, ea magni aliquid, consectetur  saepe.</p>
                </div>
                <div className="trending-post">
                    <img className="trending-img" src={postImg} alt=""/>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem beatae eius ducimus facere, ea magni aliquid, consectetur  saepe.</p>
                </div>
                <div className="trending-post">
                    <img className="trending-img" src={postImg} alt=""/>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem beatae eius ducimus facere, ea magni aliquid, consectetur  saepe.</p>
                </div>
            </div>

        </div>
    )
}

Trending.propTypes = {

}

export default Trending
