import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Button, ActivityIndicator } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomBackButtonHeader } from '../../../components/Header'
import WebView from 'react-native-webview';
const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const NewsScreenView = (props) => {

  useEffect(() => {
    console.log(props.visible)
  }, [props.visible])

  return (
    <>
      <CustomBackButtonHeader
        title={'News'}
        backFunction={props.navigation.goBack}
      />
      <View style={styles.container}>
        <WebView onLoadStart={() => props.setVisible(true)} onLoad={() => props.setVisible(false)} source={{ uri: props.route.params.news }} />
        {
          props.visible
            ? <View style={styles.centerMessage}>
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color={theme.color.primary} />
              </View>
            </View>
            : null
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  overlay: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
    borderRadius: 10
  },
  centerMessage: {
    position: 'absolute',
    height: height - 140,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default NewsScreenView;
