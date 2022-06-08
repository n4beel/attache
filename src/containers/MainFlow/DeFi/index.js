import React, { useEffect, useState } from 'react';
import services from '../../../store/config/fetchConfig';
import DeFiView from './view';

const DeFi = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const fetchData = async () => {
    let res;
    try {
      res = await services.GetPortfolio('v1/defi/compound/market');
      setLoading(false)
      const tData = [];
      for (let item in res) {
        let i = []
        i[0] = item;
        i[1] = res[item].borrow_rate
        i[2] = res[item].supply_rate
        tData.push(i)
      }
      console.log(tData)
      setData(tData)
      setRefreshing(false)
      console.log("res", res);
    }
    catch (err) {
      console.log("error while fetching DeFi", err)
      setLoading(false);
      setRefreshing(false)
      setLoginError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const onRefresh = async () => {
    console.log("refreshing Education")
    setRefreshing(true);
    fetchData()
  }

  const viewProps = {
    ...props,
    data,
    onRefresh,
    refreshing,
    loading
  };

  return <DeFiView {...viewProps} />;
};

export default DeFi;
