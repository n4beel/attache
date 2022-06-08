import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, RefreshControl, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import theme from '../../../../theme';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import { getDate, getStorageItem } from '../../../utils';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;


const EducationView = (props) => {
  const [token, setToken] = useState('')

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      (async () => {
        const token = await getStorageItem("Authorization")
        setToken(token)
      })()
    })
  }, [])

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("Video", { videoId: item.url.substr(item.url.length - 11) })} style={styles.item}>
      <View style={styles.left}>
        <Image style={styles.thumb} source={{ uri: `https://i.ytimg.com/vi/${item.url.substr(item.url.length - 11)}/mqdefault.jpg` }} />
      </View>
      <View style={styles.right}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{getDate(item.CREATED_DT)}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <CustomDrawerButtonHeader title={'Education'} />
      {
        token
          ? <View style={styles.container}>
            {
              props.loading
                ? <View style={styles.centerMessage}>
                  <ActivityIndicator size="large" color={theme.color.primary} />
                </View>
                : props.video.length > 0
                  ? <FlatList
                    data={props.video}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{ paddingHorizontal: 20 }}
                    refreshControl={
                      <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
                    }
                  />
                  : props.loginError
                    ? <View style={styles.centerMessage}>
                      <Text>Please, login or register to access education</Text>
                    </View>
                    : props.fetchError
                      ? <View style={styles.centerMessage}>
                        <Text>Something went wrong</Text>
                      </View>
                      : null
            }


          </View>
          : <View style={{ flex: 1, backgroundColor: theme.color.light, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text>Please, login or register to access education</Text></View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 20
  },
  cardContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: theme.font.bold,
    fontSize: 16,
  },
  centerMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontFamily: theme.font.regular,
    fontSize: 14,
    marginBottom: 30,
  },
  item: {
    paddingBottom: 20,
    paddingTop: 25,
    flexDirection: 'row',
    borderBottomColor: theme.color.secondary,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 32,
  },
  thumb: {
    width: 120,
    height: 67.5,
  },
  left: {
    marginRight: 10
  },
  right: {
    width: width - 160
  },
  name: {
    fontSize: 18,
    marginBottom: 6,
    fontFamily: theme.font.semiBold,
  },
  time: {
    color: theme.color.secondary,
    fontFamily: theme.font.regular,
    fontSize: 14
  },
  desc: {
    color: '#676767'
  }
});

export default EducationView;
