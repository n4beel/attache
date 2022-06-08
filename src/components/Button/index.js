/**
 * Sample React Native CustomButton
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Button, View } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const TriangleCorner = () => {
  return <View style={styles.triangleCorner} />;
};

const CustomButton = (props) => {
  return (
    <Button
      mode={props.mode ? props.mode : "contained"}
      loading={props.loading}
      onPress={() => props.onPress()}
      disabled={props.loading}
      dark={true}
      style={{
        width: 286,

        // backgroundColor: theme.color.primary,
        ...props.style,
      }}
      labelStyle={{
        ...props.labelStyle,
        paddingVertical: 8,
        fontFamily: theme.font.regular,
        fontSize: 16


      }}>
      {props.label}
    </Button>
  );
};

const InlineButton = (props) => {
  return (
    <>
      <Button
        mode={props.mode ? props.mode : "contained"}
        loading={props.loading}
        onPress={() => props.onPress()}
        disabled={props.disabled}
        dark={true}
        style={{
          minWidth: 120,
          borderRadius: 0,
          ...props.style,
        }}
        labelStyle={{
          ...props.labelStyle,
          paddingVertical: 8,
          fontFamily: theme.font.regular,
          fontSize: 16
        }}>
        {props.label}
      </Button>

    </>
  );
};

const TableCellButton = (props) => {
  return (
    <>
      <Button
        mode={props.mode ? props.mode : "contained"}
        loading={props.loading}
        onPress={() => props.onPress()}
        disabled={props.disabled}
        dark={true}
        style={{
          borderRadius: 0,
          ...props.style,
        }}
        labelStyle={{
          ...props.labelStyle,
          fontFamily: theme.font.regular,
          fontSize: 14,
        }}>
        {props.label}
      </Button>

    </>
  );
};

const GroupedButton = (props) => {
  return (
    <>
      <Button
        mode={props.activeTab == 0 ? 'contained' : 'outlined'}
        onPress={() => props.onPress()}
        style={{
          ...styles.groupButton,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}>
        {props.label[0]}
      </Button>
      <Button
        mode={props.activeTab == 1 ? 'contained' : 'outlined'}
        onPress={() => props.onPress()}
        style={{
          ...styles.groupButton,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}>
        {props.label[1]}
      </Button>
    </>
  );
};



const styles = StyleSheet.create({
  groupButton: {
    borderColor: theme.color.primary,
    width: 150,
  },
  triangleCornerBottomRight: {
    transform: [{ rotate: "180deg" }],
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 100,
    borderTopWidth: 100,
    borderRightColor: "transparent",
    borderTopColor: "red",
  },
});

export default CustomButton;
export { InlineButton, GroupedButton, TableCellButton };
