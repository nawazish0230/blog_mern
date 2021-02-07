import React, { Fragment,useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../action/auth'
import M from 'materialize-css'

const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {
    const sideNavbar = useRef(null);
    const [hide, setHide] = useState("translateX(-105%)")

    useEffect(() => {
        M.Modal.init(sideNavbar.current);
    }, [])

    const guestLink = (
        <Fragment>
            <li><Link to="/">Posts</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </Fragment>
    )

    const authLink = (
        <Fragment>
            {/* <li><Link to="/create/post">Create Post</Link></li> */}
            <li><Link to="/category">Category</Link></li>
            <li><span style={{margin: '0 1rem',cursor: 'pointer'}} onClick={logout}>Logout</span></li>
        </Fragment>
    )

    return (
        <nav className="nav-spacing #42a5f5 blue lighten-1">
            <div className="nav-wrapper">
                <span href="#!" className="brand-logo left"><Link to="/">Blog</Link></span>
                <span href="#!" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons menu-icon">menu</i></span>
            <ul  id="nav-mobile" className="right hide-on-med-and-down">
                { !loading && (<Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>)}
            </ul>
            <ul className="sidenav " style={{transform : "translateX(-105%) !important", color: 'red'}} id="mobile-demo">
                { !loading && (<Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>)}
            </ul>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar)
