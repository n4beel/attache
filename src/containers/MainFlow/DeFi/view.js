import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, RefreshControl, SafeAreaView, FlatList } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import { Table, TableWrapper, Row } from 'react-native-table-component';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const tableWidth = width - 20


const DeFiView = (props) => {

  const renderItem = ({ item, index }) => {
    // console.log("item", item)
    return (
      <View style={{ ...styles.item, backgroundColor: index % 2 ? theme.color.lightBg : theme.color.light }}>
        {
          item.map((cell, i) => (

            i === 0
              ? <View style={{ width: tableWidth / 2, paddingVertical: 10 }} key={i}>
                <Text style={styles.title}>{cell.trim()}</Text>
              </View>
              : <View style={{ width: tableWidth / 4, paddingVertical: 10 }} key={i}>
                <Text style={{ ...styles.title, textAlign: 'right' }}>{cell.trim()}</Text>
              </View>

          ))
        }
      </View>
    )
  };

  const tableHead = [
    'Instrument',
    'Borrow Rate',
    'Supply Rate'];

  const widthArr = [tableWidth / 2, tableWidth / 4, tableWidth / 4]

  return (
    <>
      <CustomDrawerButtonHeader title={'DeFi'} />
      <SafeAreaView style={styles.container}>
        {!props.loading
          ? <>
            {
              props.data
                ? (
                  <>
                    <Table >
                      <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                    </Table>
                    <FlatList
                      data={props.data}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      refreshControl={
                        <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
                      }
                    />
                  </>
                )
                :
                <View style={styles.centerMessage}>
                  <Text>No DeFi data available</Text>
                </View>

            }
          </>
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
    paddingHorizontal: 10
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
    // backgroundColor: '#f9c2ff',
    // padding: 8,
    flexDirection: 'row'
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.font.regular
  },
});

export default DeFiView;
