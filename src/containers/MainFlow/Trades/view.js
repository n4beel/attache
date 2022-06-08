import React from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { formatAMPM } from '../../../utils';


const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;
const tableWidth = width - 20

const TradesView = (props) => {

  const renderItem = ({ item, index }) => {
    const date = new Date(item.Timestamp);
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear();

    return (
      <View style={{ ...styles.item, backgroundColor: index % 2 ? theme.color.lightBg : theme.color.light }}>
        <View style={{ width: tableWidth / 4 - 10, paddingVertical: 10 }}>
          <Text style={{ ...styles.title, textAlign: 'left' }}>{item.Pair}</Text>
        </View>
        <View style={{ width: tableWidth / 4 - 10, paddingVertical: 10 }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item.Quantity}</Text>
        </View>
        <View style={{ width: tableWidth / 4 + 10, paddingVertical: 10 }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item.Price.toString().substring(0, 10)}</Text>
        </View>
        <View style={{ width: tableWidth / 4 + 10, paddingVertical: 10 }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{formatAMPM(date) + ' | ' + month + '-' + day + '-' + year}</Text>
        </View>
      </View>
    )
  };

  const tableHead = [
    'Pair',
    'Quantity',
    'Price',
    'Time | Date'
  ];

  const widthArr = [(tableWidth / 4) - 10, (tableWidth / 4) - 10, (tableWidth / 4) + 10, tableWidth / 4 + 10]

  return (
    <View style={styles.container}>
      {
        props.loading
          ? <View style={styles.centerMessage}>
            <ActivityIndicator size="large" color={theme.color.primary} />
          </View>
          : props.data.length > 0
            ? <>
              <Table style={{ marginTop: 10 }}>
                <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
              </Table>
              <FlatList
                data={props.data}
                renderItem={renderItem}
                // keyExtractor={item => item.Timestamp}
                refreshControl={
                  <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
                }
              />
            </>
            : <View style={styles.centerMessage}>
              <Text>Not Available</Text>
            </View>
      }
    </View>
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

export default TradesView;
