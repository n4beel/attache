import React, { useEffect, useState } from 'react';
import services from '../../../store/config/fetchConfig';
import { getStorageItem } from '../../../utils';
import PLView from './view';

const PL = (props) => {

  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState("")

  const fetchData = async () => {
    let res;
    const email = await getStorageItem("Email")
    console.log("user id -->", email)
    try {
      res = await fetch(`https://portfolio.attache.app/getPL/${email}`)
        .then(res => res.text())
    }
    catch (err) {
      console.log(err);
      setRefreshing(false)
      setLoading(false);
    }
    setLoading(false);
    setRefreshing(false)
    if (res === "Not available") {
      console.log("res --> not available")
    }
    else {
      console.log(Object.entries(JSON.parse(res)))
      setData(Object.entries(JSON.parse(res)))
    }
  }

  useEffect(() => {
    // props.navigation.addListener('focus', () => {
    fetchData()
    // })
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

  return <PLView {...viewProps} />;
};

export default PL;
