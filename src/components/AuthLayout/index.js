/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme, { color, font } from '../../../theme';
import { CustomBackButtonOnlyHeader } from '../Header';
import { useNavigation } from '@react-navigation/core';

const { height, width } = Dimensions.get('window');


const AuthLayout = (props) => {
  const navigation = useNavigation()

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.scrollView}>
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <CustomBackButtonOnlyHeader backFunction={props.backFunction} />
          {
            props.screen
              ? <View style={styles.imageWrapper} >
                <View>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('Signin')}>
                    <Text style={{ fontSize: 16, fontFamily: theme.font.semiBold, color: props.screen === 'signin' ? 'black' : theme.color.secondary }}>SIGN IN</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.headerImage}>
                  {
                    props.screen === "signin"
                      ? <Image style={{ width: '100%' }} resizeMode={'contain'} source={require(`../../assets/images/signin.png`)} />
                      : <Image style={{ width: '100%' }} resizeMode={'contain'} source={require(`../../assets/images/signup.png`)} />
                  }
                </View>
                <View>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ fontSize: 16, fontFamily: theme.font.semiBold, color: props.screen === 'signup' ? 'black' : theme.color.secondary }}>SIGN UP</Text>
                  </TouchableWithoutFeedback>
                </View>

              </View>
              : <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: theme.font.semiBold, textTransform: 'uppercase' }}>{props.heading}</Text>
              </View>
          }
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: width / 4 * 2.5 }} resizeMode={'contain'} source={require('./../../assets/images/attache.png')} />
          </View>
          <View style={styles.body}>

            <View style={styles.inputWrapper}>{props.children}</View>

          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
    flex: 1
  },
  body: {
    backgroundColor: Colors.white,
    // flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  imageWrapper: {
    // marginTop: 30,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  headerImage: {
    flex: 1,
    paddingHorizontal: 20
  },
  inputWrapper: {
    flexDirection: 'column',
  },
  heading: {
    fontSize: 18,
    marginTop: 39,
    color: color.primary,
    textAlign: 'left',
    // width: 280,
    fontFamily: font.semiBold,
  },
  buttonWrapper: {
    marginTop: 25,
  },
  clickWrapper: {
    flexDirection: 'row',
    // width: 280,
    marginTop: 20,
    paddingBottom: 20,
  },
  clickText: {
    fontFamily: theme.font.regular,
    fontSize: 13,
    color: color.primary,
  },
  clickTextBold: {
    fontSize: 13,
    color: color.primary,
    fontFamily: font.bold,
  },
});

export default AuthLayout;
