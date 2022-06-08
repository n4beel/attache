import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthLayout from '../../../components/AuthLayout';
import { FullWidthInput as Input } from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import theme, { color, font } from '../../../../theme';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { InlineButton as Button } from './../../../components/Button';

const SigninView = (props) => {

  const navigation = useNavigation()

  const layoutProps = {
    heading: 'Sign in to your account',
    buttonLabel: 'Login',
    clickText: "Don't have an account?",
    onAuthToggle: props.navigateToSignup,
    onPress: props.onSubmit,
    page: 'Login',
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
      <AuthLayout {...layoutProps} screen={'signin'}>
        <Input
          label="Email"
          errorText={props.emailError.message}
          error={props.emailError.error}
          onBlur={props.onBlur}
          value={props.email}
          onChange={props.onChange}
        />
        <Input
          label="Password"
          error={props.passwordError.error}
          errorText={props.passwordError.message}
          isSecure={true}
          onBlur={props.onBlur}
          value={props.password}
          onChange={props.onChange}
        />
        <View style={styles.actionWrapper}>
          <View>
            <Text style={styles.forgetText} onPress={props.onForgetPress}>
              Forgot Password?
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              loading={props.loading}
              onPress={layoutProps.onPress}
              label={layoutProps.buttonLabel}
              disabled={props.loading} />
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
    marginTop: 140,
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
  forgetText: {
    fontSize: 16,
    fontFamily: theme.font.regular,
    width: 160,
    textAlign: 'left',
  },
});

export default SigninView;
