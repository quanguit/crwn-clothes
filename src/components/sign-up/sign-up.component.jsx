import React, { useState } from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';


const SignUp = ({ signUpStart }) => {

    const [userCredentials, setUserCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("Password don't match");
            return;
        }
        signUpStart({ email, password, displayName });

        // SIGN UP START
        // const { user } = await auth.createUserWithEmailAndPassword(email, password);
        // await createUserProfileDocument(user, { displayName });

        // SIGN UP SUCCESS (qua firebase.utils)
        // this.setState({displayName: '', email: '', password: '', confirmPassword: ''});

    }

    const handleChange = event => {
        const { value, name } = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    }

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            
            <form onSubmit={handleSubmit}>
                <FormInput name="displayName" type="text" value={displayName} handleChange={handleChange} label="Display Name" required />                  
                <FormInput name="email" type="email" value={email} handleChange={handleChange} label="Email" required />
                <FormInput name="password" type="password" value={password} handleChange={handleChange} label="Password" required />
                <FormInput name="confirmPassword" type="password" value={confirmPassword} handleChange={handleChange} label="Confirm Password" required />

                <CustomButton type="submit">Sign up</CustomButton>
            </form>
        </div>
    )
}

const mapDisPatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDisPatchToProps)(SignUp);