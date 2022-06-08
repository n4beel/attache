import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

const CustomDrawerButtonHeader = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.skirts} />
      <Text style={styles.heading}>{props.title}</Text>
      <TouchableOpacity
        style={{ ...styles.drawerTrigger, ...styles.skirts }}
        onPress={() => { console.log("hello"); navigation.openDrawer() }}>
        <FeatherIcon name="bar-chart-2" size={28} color="#000000" style={{ transform: [{ rotate: "270deg" }], }} />
      </TouchableOpacity>
    </View>
  );
};

const CustomMarketHeader = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Text style={{ ...styles.heading, textAlign: 'left', paddingLeft: 20 }}>{props.title}</Text>
      <View style={{}}>
        {
          props.connected
            ? <View style={styles.status}>
              <View style={{ ...styles.dot, backgroundColor: theme.color.high }} />
              <Text style={{ fontFamily: theme.font.regular }}>connected</Text>
            </View>
            : <View style={styles.status}>
              <View style={{ ...styles.dot, backgroundColor: theme.color.low }} />
              <Text style={{ fontFamily: theme.font.regular }}>disconnected</Text>
            </View>
        }
      </View>
      <TouchableOpacity
        style={{ ...styles.drawerTrigger, ...styles.skirts }}
        onPress={() => navigation.openDrawer()}>
        <FeatherIcon name="bar-chart-2" size={28} color="#000000" style={{ transform: [{ rotate: "270deg" }], }} />
      </TouchableOpacity>
    </View>
  );
};

const CustomCloseButtonHeader = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.skirts} />
      <Text style={styles.heading}>{props.title}</Text>
      <TouchableOpacity
        style={{ ...styles.drawerTrigger, ...styles.skirts }}
        onPress={props.closeFunction}>
        <AntIcon name="close" size={26} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};

const CustomBackButtonHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{ ...styles.drawerTrigger, ...styles.skirts }}
        onPress={props.backFunction}>
        <AntIcon name="arrowleft" size={26} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.heading}>{props.title}</Text>
      <View style={styles.skirts} />
    </View>
  );
};

const CustomBackButtonOnlyHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{ ...styles.drawerTrigger, ...styles.skirts }}
        onPress={props.backFunction}>
        <AntIcon name="arrowleft" size={26} color="#000000" />
      </TouchableOpacity>

    </View>
  );
};

export {
  CustomDrawerButtonHeader,
  CustomBackButtonHeader,
  CustomCloseButtonHeader,
  CustomBackButtonOnlyHeader,
  CustomMarketHeader
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: theme.color.light,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  drawerTrigger: {
    // backgroundColor: 'green',
    height: 72,
    width: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: theme.font.semiBold,
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    // marginLeft: 10,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10
  },
  skirts: {
    width: 64,
  },
});
