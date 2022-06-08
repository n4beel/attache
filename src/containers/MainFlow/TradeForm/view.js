import React from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomCloseButtonHeader } from '../../../components/Header';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FullWidthInput as Input } from '../../../components/TextInput';
import { InlineButton } from '../../../components/Button';

const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const TradeFormView = (props) => {


  return (
    <>
      <CustomCloseButtonHeader
        title={'Add Trade'}
        closeFunction={props.onClose}
      />
      {
        props.loading
          ? <View style={styles.centerMessage}>
            <ActivityIndicator size="large" color={theme.color.primary} />
          </View>
          : <View style={styles.container}>
            <ScrollView style={styles.cardContainer} >
              <Input
                errorText={props.pairError.message}
                error={props.pairError.error}
                onBlur={props.onBlur}
                label="Pair"
                value={props.pair}
                onChange={props.onChange}
              />
              <Input
                errorText={props.quantityError.message}
                error={props.quantityError.error}
                onBlur={props.onBlur}
                label="Quantity"
                value={props.quantity}
                onChange={props.onChange}
                isNumber={true}
              />
              <Input
                errorText={props.priceError.message}
                error={props.priceError.error}
                onBlur={props.onBlur}
                label="Price"
                value={props.price}
                onChange={props.onChange}
                isNumber={true}
              />

            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", position: 'absolute', bottom: 0, width: '100%', padding: 20 }}>
              <View style={{ width: (width - 40) / 2 - 10 }}>
                <InlineButton style={{ backgroundColor: theme.color.high }} onPress={() => props.onSubmit("buy")} label={"buy"} />
              </View>
              <View style={{ width: (width - 40) / 2 - 10 }}>
                <InlineButton style={{ backgroundColor: theme.color.low }} onPress={() => props.onSubmit("sell")} label={"sell"} />
              </View>
            </View>
          </View>
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
  centerMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },
});

export default TradeFormView;
