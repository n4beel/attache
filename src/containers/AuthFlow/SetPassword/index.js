import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import SetPasswordView from './view';
import {
  setPassword as resetPassword,
  toggleAuthActionCreator,
} from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { onSnackbar } from '../../../store/actions/layoutActions';
import { setStorageItem, validateEmail } from '../../../utils';
import { StackActions } from '@react-navigation/core';

const SetPassword = (props) => {
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState({ error: false, message: '' });
  const [resetTokenError, setResetTokenError] = useState({ error: false, message: '' });

  const onChange = (data) => {
    const { text, name } = data;
    if (name.toLowerCase() === 'reset token') {
      setResetToken(text);
    }
    if (name.toLowerCase() === 'password') {
      setPassword(text);
    }
  };

  const onBlur = (name) => {
    console.log('name in blur');
    if (name.toLowerCase() === 'reset token') {
      if (resetToken.length <= 0) {
        setResetTokenError({ error: true, message: 'Reset token cannot be empty' });
      } else {
        setResetTokenError({ error: false, message: '' });
      }
    }
    if (name.toLowerCase() === 'password') {
      if (password.length < 8) {
        setPasswordError({
          error: true,
          message: 'Password should have atleast 8 characters.',
        });
      } else {
        setPasswordError({ error: false, message: '' });
      }
    }
  };

  const onSubmit = () => {
    try {
      if (password.trim() && !password.error && resetToken.trim() && !resetTokenError.error) {
        setLoading(true);

        resetPassword(
          { resetToken, password },
          (res) => {
            props.showAlert(res.msg);
            setStorageItem('Authorization', res.token);
            console.log('res of RESET -->', res);
            setLoading(false);
            props.navigation.dispatch(StackActions.replace("MainFlow"))

          },
          (err) => {
            props.showAlert(err.err || err);
            console.log('err of RESET -->', err);
            setLoading(false);
          },
        );
      } else {
        props.showAlert('Please fill all fields with valid data.');
      }
    } catch (e) {
      console.log('e in forget -->', e);
      setLoading(false);
    }
  };

  const navigateToSignup = () => {
    props.navigation.navigate('Signup');
  };

  const viewProps = {
    password,
    passwordError,
    resetToken,
    resetTokenError,
    loading,
    onChange,
    onBlur,
    onSubmit,
    navigateToSignup,
  };

  return <SetPasswordView {...viewProps} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
