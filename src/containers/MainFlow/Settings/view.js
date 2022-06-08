import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomCloseButtonHeader } from '../../../components/Header';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const SettingsView = (props) => {
  return (
    <>
      <CustomCloseButtonHeader
        title={'Settings'}
        closeFunction={props.navigation.goBack}
      />
      <View style={styles.container}>
        <ScrollView style={styles.cardContainer}></ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: theme.font.bold,
    fontSize: 16,
  },
  paragraph: {
    fontFamily: theme.font.regular,
    fontSize: 14,
    marginBottom: 30,
  },
});

export default SettingsView;
