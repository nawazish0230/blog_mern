import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import {login} from '../../action/auth'
import PropTypes from 'prop-types';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const changeHandler = e => setFormData({...formData, [e.target.name]: e.target.value})

    const submitHandler = e => {
        e.preventDefault();
        console.log(formData)
        login({email, password})
    }

    if(isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <div className="row">
            <div className="col s9 push-s1 l4 push-l4">
            <blockquote>
            <h4>Login</h4>
            </blockquote>
                <form onSubmit={submitHandler} noValidate>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={email}
                            className="validate" 
                            onChange={e => changeHandler(e)}
                        />
                        <label htmlFor="email">Email</label>
                        {/* <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> */}
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">remove_red_eye</i>
                        <input 
                            id="password" 
                            type="password" 
                            name="password"
                            className="validate" 
                            value={password}
                            onChange={e => changeHandler(e)}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="waves-effect waves-light btn #42a5f5 blue lighten-1">Login</button>
                </div>
                </form>
                <h6 >Not have an account ? <Link to="/register">Register</Link></h6>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, login })(Login);
