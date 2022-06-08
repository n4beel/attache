import React, { useCallback, useEffect, useState } from 'react';
import MarketView from './view';
import TcpSocket from 'react-native-tcp-socket';
let client;

const Market = (props) => {
  const [prices, setPrices] = useState('');
  const [connected, setConnected] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [initial, setInitial] = useState(true)
  const [loading, setLoading] = useState(true);

  let priceServerData = '';

  // (() => {
  // if (initial) {
  //   client = TcpSocket.createConnection({
  //     port: 7070,
  //     host: "priceserver.attache.app",
  //   });
  // }
  // })()

  useEffect(() => {
    if (initial) {
      client = TcpSocket.createConnection({
        port: 7070,
        host: "priceserver.attache.app",
      });
    }
    // Socket Event - When data is received
    client.on('data', (data) => {
      if (data == 49) {
        client.write('GETQUOTES\r\n');
      }
      if (data.includes(`type: "QUOTES"`)) {
        priceServerData = ''
      }
      if (data.includes(`;`)) {
        priceServerData += data
        if ((priceServerData.match(/"/g) || []).length === 4) {
          // setPrices(priceServerData)
          displayData(priceServerData)
        }
      }
    });

    // Socket Event - When socket connects
    client.on('connect', () => {
      console.log("connection established");
      // Write on the socket
      client.write('AUTH test1@test.com password1\r\n');
      console.log("sending data")
      setInitial(false)
      setConnected(true);
      setLoading(false)
    });

    // Socket Event - When error occurs
    client.on('error', (error) => {
      console.log("error occured", error);
    });

    // Socket Event - When connection is closed
    client.on('close', () => {
      console.log('Connection closed!');
      setConnected(false)
      setLoading(false)
    });
  }, [])

  const displayData = (data) => {
    const dataArray = []
    data = data.slice(66, data.length - 2)
    data = data.split(`\n`)
    for (let item of data) {
      dataArray.push(item.split(';'))
    }
    console.log("displaying data")
    // console.log("data array", dataArray)
    setRefreshing(false)
    setPrices(dataArray)
  }

  const onRefresh = () => {
    console.log("refreshing", client.address())
    setRefreshing(true);
    client.write('GETQUOTES\r\n');
  }

  const onReconnect = () => {
    setLoading(true)
    client = TcpSocket.createConnection({
      port: 7070,
      host: "priceserver.attache.app",
    });

    client.on('data', (data) => {
      if (data == 49) {
        client.write('GETQUOTES\r\n');
      }
      if (data.includes(`type: "QUOTES"`)) {
        priceServerData = ''
      }
      if (data.includes(`;`)) {
        priceServerData += data
        if ((priceServerData.match(/"/g) || []).length === 4) {
          // setPrices(priceServerData)
          displayData(priceServerData)
        }
      }
    });

    // Socket Event - When socket connects
    client.on('connect', () => {
      console.log("connection established");
      // Write on the socket
      client.write('AUTH test1@test.com password1\r\n');
      console.log("sending data")
      setInitial(false)
      setConnected(true);
      setLoading(false)
    });

    // Socket Event - When error occurs
    client.on('error', (error) => {
      console.log("error occured", error);
    });

    // Socket Event - When connection is closed
    client.on('close', () => {
      console.log('Connection closed!');
      setConnected(false)
      setLoading(false)
    });
  }

  const viewProps = {
    ...props,
    prices,
    connected,
    refreshing,
    loading,
    onRefresh,
    onReconnect
  };

  return <MarketView {...viewProps} />;
};

export default Market;
