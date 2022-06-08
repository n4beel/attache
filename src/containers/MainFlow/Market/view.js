import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, RefreshControl, SafeAreaView, FlatList } from 'react-native';
import theme, { font } from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomMarketHeader } from '../../../components/Header';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { InlineButton } from '../../../components/Button';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const cellWidth = 140;



const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const MarketView = (props) => {

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ ...styles.item, backgroundColor: index % 2 ? theme.color.lightBg : theme.color.light }}>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[0].trim()}</Text>
        </View>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[1].substring(0, 14)}</Text>
        </View>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[2].substring(0, 14)}</Text>
        </View>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[3].substring(0, 14)}</Text>
        </View>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[4].substring(0, 14)}</Text>
        </View>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[5].substring(0, 14)}</Text>
        </View>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[6].substring(0, 14)}</Text>
        </View>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[7].substring(0, 14)}</Text>
        </View>
        <View style={{ width: cellWidth, paddingVertical: 10 }}>
          <Text style={styles.title}>{item[8].substring(0, 14)}</Text>
        </View>
      </View>
    )
  };

  // const tableHead = [
  //   'Open',
  //   'Last',
  //   'Bid',
  //   'Ask',
  //   'High',
  //   'Low',
  //   'Vwap',
  //   'Volume',
  //   'Quote Volume'];

  const tableHead = [
    'Pair',
    'Open',
    'Last',
    'Bid',
    'Ask',
    'High',
    'Low',
    // 'Vwap',
    'Volume',
    'Quote Volume'];

  const widthArr = [cellWidth, cellWidth, cellWidth, cellWidth, cellWidth, cellWidth, cellWidth, cellWidth, cellWidth]


  return (
    <>
      <CustomMarketHeader connected={props.connected} title={'Market'} />
      <SafeAreaView style={styles.container}>
        {!props.loading
          ? props.connected
            ? <>
              {
                props.prices
                  ? (
                    <ScrollView style={{ marginHorizontal: 10 }} contentContainerStyle={{ flexDirection: 'column' }} horizontal={true}>
                      <Table>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                      </Table>
                      <FlatList
                        data={props.prices}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        refreshControl={
                          <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
                        }
                      />
                    </ScrollView>
                  )
                  : <View style={styles.centerMessage}>
                    <Text>No data available</Text>
                  </View>
              }
              {/* <View style={{ height: 40, backgroundColor: 'yellow' }}></View> */}
            </>
            : <View style={styles.centerMessage}>
              <Text>Unable to establish connection</Text>
              <InlineButton style={{ marginTop: 20 }} onPress={props.onReconnect} label={'Reconnect'} />
            </View>
          : <View style={styles.centerMessage}>
            <ActivityIndicator size="large" color={theme.color.primary} />
          </View>}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 16
  },
  header: { height: 40, backgroundColor: theme.color.lightBg },
  text: { textAlign: 'center', fontWeight: '600', color: theme.color.secondary, fontFamily: theme.font.regular },
  // dataWrapper: { flex: 1, marginTop: -1 },
  row: { height: 40, backgroundColor: theme.color.light },
  centerMessage: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    paddingTop: 10,
    paddingHorizontal: 20
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
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    fontFamily: theme.font.regular
  },
});

export default MarketView;
