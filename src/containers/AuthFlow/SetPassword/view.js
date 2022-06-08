import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthLayout from '../../../components/AuthLayout';
import { FullWidthInput as Input } from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import theme, { color, font } from '../../../../theme';
import { useNavigation } from '@react-navigation/native';
import { InlineButton as Button } from './../../../components/Button';

const SetPasswordView = (props) => {

  const navigation = useNavigation()

  const layoutProps = {
    heading: 'Reset Password',
    buttonLabel: 'Reset',
    // clickText: "Don't have an account?",
    onAuthToggle: props.navigateToSignup,
    onPress: props.onSubmit,
    page: 'Set',
    loading: props.loading,
    backFunction: () => { navigation.goBack() }
  };
  return (
    <>
      <AuthLayout {...layoutProps}>
        <Input
          label="Reset Token"
          errorText={props.resetTokenError.message}
          error={props.resetTokenError.error}
          onBlur={props.onBlur}
          value={props.resetToken}
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
    fontSize: 13,
    color: color.primary,
    fontFamily: theme.font.regular,
    marginTop: 8,
    width: 160,
    textAlign: 'right',
  },
});

export default SetPasswordView;
