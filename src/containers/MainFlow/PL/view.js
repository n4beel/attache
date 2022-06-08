import React from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { TableCellButton } from '../../../components/Button';


const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;
const tableWidth = 900

const PLView = (props) => {

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ ...styles.item, backgroundColor: index % 2 ? theme.color.lightBg : theme.color.light }}>
        <View style={{ width: tableWidth / 9 + 20, paddingVertical: 10, alignItems: 'flex-start' }}>
          <TableCellButton onPress={() => props.navigation.navigate('TradeForm', { pair: item[0] })} style={{ marginHorizontal: 10 }} label={"trade"} />
        </View>
        <View style={{ width: tableWidth / 9, paddingVertical: 10, justifyContent: 'center' }}>
          <Text style={{ ...styles.title, textAlign: 'left' }}>{item[0]}</Text>
        </View>
        <View style={{ width: tableWidth / 9, paddingVertical: 10, justifyContent: 'center' }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item[1].Initial}</Text>
        </View>
        <View style={{ width: tableWidth / 9, paddingVertical: 10, justifyContent: 'center' }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item[1].Quantity}</Text>
        </View>
        <View style={{ width: tableWidth / 9, paddingVertical: 10, justifyContent: 'center' }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item[1].ROI}</Text>
        </View>
        <View style={{ width: tableWidth / 9, paddingVertical: 10, justifyContent: 'center' }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item[1].RPL?.toString().substr(0, 10)}</Text>
        </View>
        <View style={{ width: tableWidth / 9, paddingVertical: 10, justifyContent: 'center' }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item[1]['Trade Count']}</Text>
        </View>
        <View style={{ width: tableWidth / 9, paddingVertical: 10, justifyContent: 'center' }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item[1].UPL?.toString().substr(0, 10)}</Text>
        </View>
        <View style={{ width: tableWidth / 9, paddingVertical: 10, justifyContent: 'center' }}>
          <Text style={{ ...styles.title, textAlign: 'right' }}>{item[1].VWAP?.toString().substr(0, 10)}</Text>
        </View>

      </View>
    )
  };

  const tableHead = [
    '',
    'Pair',
    'Initial',
    'Quantity',
    'ROI',
    'RPL',
    'Trades',
    'UPL',
    'VWAP',
  ];


  const widthArr = [tableWidth / 9 + 20, tableWidth / 9, tableWidth / 9, tableWidth / 9, tableWidth / 9, tableWidth / 9, tableWidth / 9, tableWidth / 9, tableWidth / 9,

  ]



  return (
    <View style={styles.container}>
      {
        props.loading
          ? <View style={styles.centerMessage}>
            <ActivityIndicator size="large" color={theme.color.primary} />
          </View>
          : props.data.length > 0
            ? <>
              <ScrollView contentContainerStyle={{ flexDirection: 'column' }} horizontal={true}>

                <Table style={{ marginTop: 10 }}>
                  <Row
                    data={tableHead}
                    widthArr={widthArr}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>
                <FlatList
                  data={props.data}
                  renderItem={renderItem}
                  // keyExtractor={item => item.Timestamp}
                  refreshControl={
                    <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
                  }
                />
              </ScrollView>
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

export default PLView;
