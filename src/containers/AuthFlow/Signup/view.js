/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FullWidthInput as Input } from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import AuthLayout from '../../../components/AuthLayout';
import theme, { color, font } from '../../../../theme';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { InlineButton as Button } from './../../../components/Button';

const SignupView = (props) => {
  const navigation = useNavigation()

  const layoutProps = {
    heading: 'Create an account',
    buttonLabel: 'Sign Up',
    clickText: 'Already have an account?',
    onAuthToggle: props.navigateToSignin,
    onPress: props.onSubmit,
    page: 'Signup',
    loading: props.loading,
    backFunction: () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'BottomTabs' }
          ],
        })
      );
    }
  };
  return (
    <>
      <AuthLayout {...layoutProps} screen={'signup'}>
        <Input
          label="First Name"
          value={props.firstName}
          onChange={props.onChange}
          onBlur={props.onBlur}
          errorText={props.firstNameError.message}
          error={props.firstNameError.error}
        />
        <Input
          label="Last Name"
          value={props.lastName}
          onChange={props.onChange}
          onBlur={props.onBlur}
          errorText={props.lastNameError.message}
          error={props.lastNameError.error}
        />
        <Input
          label="Email"
          errorText={props.emailError.message}
          error={props.emailError.error}
          onBlur={props.onBlur}
          value={props.email}
          onChange={props.onChange}
        />
        {/* <Input
          label="Username"
          errorText={props.usernameError.message}
          error={props.usernameError.error}
          onBlur={props.onBlur}
          value={props.username}
          onChange={props.onChange}
        /> */}
        <Input
          label="Password"
          error={props.passwordError.error}
          errorText={props.passwordError.message}
          isSecure={true}
          onBlur={props.onBlur}
          value={props.password}
          onChange={props.onChange}
        />
        {/* <View style={styles.actionWrapper}>
          <View style={styles.checkboxWrapper}>
            <Checkbox checked={props.checked} onPress={props.onCheckToggle} />
            <Text style={styles.checkboxText}>
              I agree with{' '}
              <Text style={styles.checkboxTextBold}>Terms & Conditions</Text>
            </Text>
          </View>
        </View> */}
        <View style={styles.actionWrapper}>
          <View>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              loading={props.loading}
              onPress={layoutProps.onPress}
              label={layoutProps.buttonLabel}
              disabled={props.loading}
            />
          </View>
        </View>
      </AuthLayout>
    </>
  );
};

const styles = StyleSheet.create({
  actionWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkboxWrapper: {
    flexDirection: 'row',
  },
  checkboxText: {
    fontSize: 13,
    color: color.primary,
    fontFamily: theme.font.regular,
    textAlignVertical: 'center',
  },
  checkboxTextBold: {
    fontFamily: font.bold,
  },
  forgetText: {
    fontSize: 13,
    color: color.primary,
    fontFamily: theme.font.regular,
    marginTop: 8,
    width: 160,
    textAlign: 'right',
  },
});

export default SignupView;
