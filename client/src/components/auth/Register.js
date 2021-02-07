import React, {useState} from 'react';
import {Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { setAlert } from '../../action/alert';
import { register} from '../../action/auth'

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const {name, email, password} = formData;

    const changehandler = e => setFormData({...formData, [e.target.name] : e.target.value})

    const submitHandler = e => {
        e.preventDefault();
        register({name, email, password})
    }

    if(isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <div className="row">
            <div className="col s9 push-s1 l4 push-l4">
            <blockquote>
            <h4>Register</h4>
            </blockquote>
                <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={email} 
                            onChange={e => changehandler(e)} 
                        />
                        <label htmlFor="email">Email</label>
                        {/* <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> */}
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input 
                            id="name" 
                            name="name" 
                            type="text" 
                            onChange={e => changehandler(e)} 
                            value={name} 
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">remove_red_eye</i>
                        <input 
                            id="password" 
                            type="password" 
                            name="password"
                            onChange={e => changehandler(e)} 
                            value={password}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="waves-effect waves-light btn 42a5f5 blue lighten-1">Register</button>
                </div>
                </form>
                <h6>Already have an account ? <Link to="/login">login</Link></h6>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);
