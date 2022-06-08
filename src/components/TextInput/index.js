/**
 * Sample React Native CustomButton
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import theme from '../../../theme';

const CustomInput = ({
  label,
  value,
  placeholder,
  onChange,
  isSecure = false,
  error = false,
  onBlur,
  errorText,
  customStyles,
  isNumber
}) => {
  // console.log('props of input -->',onBlur)
  return (
    <>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChange({ text, name: label })}
        style={{ ...styles.input, ...customStyles }}
        secureTextEntry={isSecure}
        error={error}
        onBlur={(e) => !!onBlur && (console.log('blur chala', onBlur), onBlur(label))}
        keyboardType={isNumber && "numeric"}
        fontFamily={theme.font.regular}

      />
      <HelperText style={{ fontFamily: theme.font.regular }} type={error ? "error" : "info"} visible >{errorText}</HelperText>
    </>
  );
};

export const FullWidthInput = ({
  label,
  value,
  placeholder,
  onChange,
  isSecure = false,
  error = false,
  onBlur,
  errorText,
  customStyles,
  isNumber
}) => {
  // console.log('props of input -->',onBlur)
  return (
    <>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChange({ text, name: label })}
        style={{ ...styles.longInput, ...customStyles }}
        secureTextEntry={isSecure}
        error={error}
        onBlur={(e) => !!onBlur && (console.log('blur chala', onBlur), onBlur(label))}
        keyboardType={isNumber && "numeric"}
        theme={{ fonts: { regular: 'Exo2-Regular' } }}
        fontFamily={theme.font.regular}
      />
      <HelperText style={{ fontFamily: theme.font.regular }} type={error ? "error" : "info"} visible >{errorText}</HelperText>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 287,
    backgroundColor: 'white',
    fontFamily: theme.font.regular
    // marginBottom: 15,
    // fontFamily: 'Nunito-Regular',
  },
  longInput: {
    width: '100%',
    backgroundColor: 'white',
    fontFamily: theme.font.regular

    // marginBottom: 15,
    // fontFamily: 'Nunito-Regular',
  },
});

export default CustomInput;
