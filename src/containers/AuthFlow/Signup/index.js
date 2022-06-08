import React, { useState, useContext } from 'react';
import SignupView from './view';
import { validateFullName, validateEmail } from '../../../utils';
import {
  signUp,
  toggleAuthActionCreator,
} from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { setStorageItem } from '../../../utils';
import { StackActions } from '@react-navigation/core';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState({ error: false, message: '' });
  const [usernameError, setUsernameError] = useState({ error: false, message: '' });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: '',
  });
  const [firstNameError, setFirstNameError] = useState({
    error: false,
    message: '',
  });
  const [lastNameError, setLastNameError] = useState({
    error: false,
    message: '',
  });

  const onChange = (data) => {
    const { text, name } = data;
    if (name.toLowerCase() === 'email') {
      setEmail(text);
    } else if (name.toLowerCase() === 'username') {
      setUsername(text);
    } else if (name.toLowerCase() === 'password') {
      setPassword(text);
    } else if (name.toLowerCase() === 'first name') {
      setfirstName(text);
    } else {
      setlastName(text);
    }
  };

  const onBlur = (name) => {
    if (name.toLowerCase() === 'email') {
      const res = validateEmail(email);
      if (!res) {
        setEmailError({ error: true, message: 'Please enter a valid email.' });
      } else {
        setEmailError({ error: false, message: '' });
      }
    } else if (name.toLowerCase() === 'username') {
      if (username.length < 4) {
        setUsernameError({
          error: true,
          message: 'Username should have atleast 4 characters.',
        });
      } else {
        setUsernameError({ error: false, message: '' });
      }
    } else if (name.toLowerCase() === 'password') {
      if (password.length < 8) {
        setPasswordError({
          error: true,
          message: 'Password should have atleast 8 characters.',
        });
      } else {
        setPasswordError({ error: false, message: '' });
      }
    } else if (name.toLowerCase() === 'first name') {
      if (!validateFullName(firstName)) {
        setFirstNameError({
          error: true,
          message: 'Please enter a valid first name.',
        });
      } else {
        setFirstNameError({ error: false, message: '' });
      }
    } else {
      if (!validateFullName(lastName)) {
        setLastNameError({
          error: true,
          message: 'Please enter a valid last name.',
        });
      } else {
        setLastNameError({ error: false, message: '' });
      }
    }
  };

  const onCheckToggle = () => {
    setChecked(!checked);
  };

  const navigateToSignin = () => {
    props.navigation.navigate('Signin');
  };

  const onSubmit = () => {
    try {
      if (
        firstName.trim() &&
        !firstNameError.error &&
        lastName.trim() &&
        !lastNameError.error &&
        email.trim() &&
        !emailError.error &&
        password.trim() &&
        !passwordError.error
        // username.trim() &&
        // !usernameError.error
      ) {
        // if (!checked) {
        //   props.showAlert('Please agree to Terms & Conditions to continue.');
        //   return;
        // }
        setLoading(true);
        const SIGNUP_DATA = {
          email: email.toLowerCase(),
          firstName,
          lastName,
          password,
        };

        console.log("signup data =>", SIGNUP_DATA)

        signUp(
          SIGNUP_DATA,
          (res) => {
            console.log('res of SIGNUP -->', res);
            setStorageItem('Authorization', res.token);
            setStorageItem('UserID', res.userId);
            setStorageItem('Email', SIGNUP_DATA.email);
            props.toggleAuth(res.user);
            setLoading(false);
            props.showAlert(res.msg);
            props.navigation.dispatch(StackActions.replace("MainFlow"))

          },
          (err) => {
            props.showAlert(err.err || err);
            console.log('err of SIGNUP -->', err);
            setLoading(false);
          },
        );
      } else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in signup -->', e);
      setLoading(false);
    }
  };

  const viewProps = {
    email,
    username,
    password,
    checked,
    loading,
    onChange,
    onCheckToggle,
    navigateToSignin,
    emailError,
    usernameError,
    passwordError,
    onBlur,
    firstName,
    lastName,
    firstNameError,
    lastNameError,
    onSubmit,
  };

  return <SignupView {...viewProps} />;
};

const mapStateToProps = (state) => {
  return {
    open: state.layoutReducer.snackbarState,
    message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    showAlert: (message) => dispatch(onSnackbar(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
