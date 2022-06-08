import React, { useEffect, useState } from 'react';
import { getStorageItem } from '../../../utils';
import TradesView from './view';

const Trades = (props) => {

  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState("");

  const fetchData = async () => {

    let res;
    const email = await getStorageItem("Email")
    console.log("user id -->", email)
    try {
      res = await fetch(`https://portfolio.attache.app/getBlotter/${email}`)
        .then(res => res.text())
    }
    catch (err) {
      console.log(err);
      setRefreshing(false)
      setLoading(false);
    }
    setLoading(false);
    setRefreshing(false);
    if (res === "Not available") {
      console.log("res --> not available blotter")
    }
    else {
      console.log(Object.values(JSON.parse(res)))
      setData(Object.values(JSON.parse(res)))
    }
  }

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      console.log("refreshing")
      fetchData()
    })
  }, [])


  const onRefresh = async () => {
    console.log("refreshing Education")
    setRefreshing(true);
    fetchData()
  }


  const viewProps = {
    ...props,
    loading,
    data,
    refreshing,
    onRefresh
  };

  return <TradesView {...viewProps} />;
};

export default Trades;
