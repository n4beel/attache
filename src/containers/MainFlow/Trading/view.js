import React, { useEffect, useState } from 'react';
import { getStorageItem } from '../../../utils';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerButtonHeader } from '../../../components/Header';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PL from '../PL';
import Trades from '../Trades';
import { InlineButton } from '../../../components/Button';


const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const MaterialTopTabs = createMaterialTopTabNavigator();

const CreateTopTabs = () => {


  return (
    <MaterialTopTabs.Navigator
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: theme.color.primary
        }
      }}
    >
      <MaterialTopTabs.Screen
        name="PL"
        style={{ marginBottom: 16 }}
        component={PL}
        options={{
          tabBarLabel: 'P/L',
          tabBarIcon: () => <EIcon name="bar-graph" color="#fff" size={20} />,
        }}
      />
      <MaterialTopTabs.Screen
        name="Trades"
        style={{ marginBottom: 16 }}
        component={Trades}
        options={{
          tabBarLabel: 'Trades',
          tabBarIcon: () => <MCIcon name="finance" color="#fff" size={20} />,
        }}
      />

    </MaterialTopTabs.Navigator>
  );
};

const TradingView = (props) => {

  const [token, setToken] = useState('')

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      (async () => {
        const token = await getStorageItem("Authorization")
        setToken(token)
      })()
    })
  }, [])
  return (
    <>
      <CustomDrawerButtonHeader title={'Paper Trading'} />
      {
        token
          ? <>
            <CreateTopTabs />
            <View style={{ padding: 10, backgroundColor: theme.color.light }}>
              <InlineButton onPress={() => { props.navigation.navigate('TradeForm') }} label="Add Trade" />
            </View>
          </>
          : <View style={{ flex: 1, backgroundColor: theme.color.light, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text>Please, login or register to access paper trading</Text></View>
      }
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

export default TradingView;
