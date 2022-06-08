import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import { getDate } from '../../../utils';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const NewsView = (props) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { props.navigation.navigate("News", { news: item.id }); console.log("helloß") }} style={styles.item}>
      <>
        <View style={styles.left}>
          <Text style={styles.name} numberOfLines={3}>{item.title}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={styles.source}>cointelegraph.com</Text>
            <Text style={styles.time}>{getDate(item.published)}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Image style={styles.thumb} source={{ uri: `https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F908633080%2F960x0.jpg%3Ffit%3Dscale` }} />
        </View>
      </>
    </TouchableOpacity>
  );


  return (
    <>
      <CustomDrawerButtonHeader title={'News'} />
      <View style={styles.container}>
        {
          props.loading
            ? <View style={styles.centerMessage}>
              <ActivityIndicator size="large" color={theme.color.primary} />
            </View>
            : props.RSS.length > 0
              ? <FlatList
                data={props.RSS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ paddingHorizontal: 20 }}
                refreshControl={
                  <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
                }
              />
              : <View style={styles.centerMessage}>
                <Text>Error in Fetching News</Text>
              </View>
        }

      </View>
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
  centerMessage: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center'
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
  time: {
    color: theme.color.secondary,
    fontFamily: theme.font.regular,
    fontSize: 14
  },
  source: {
    color: theme.color.primary,
    fontFamily: theme.font.regular,
    fontSize: 14,
    marginRight: 20
  },
  thumb: {
    width: 100,
    height: 72,
  },
  left: {
    width: width - 160,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 6,
    fontFamily: theme.font.semiBold,
    height: 72,

  },
});

export default NewsView;
