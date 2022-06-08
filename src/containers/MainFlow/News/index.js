import React, { useEffect, useState } from 'react';
import NewsView from './view';
import * as rssParser from 'react-native-rss-parser';

const News = (props) => {

  const [RSS, setRSS] = useState([]);
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      await fetch('https://cointelegraph.com/feed')
        .then((response) => { console.log(response); return response.text() })
        .then((responseData) => rssParser.parse(responseData))
        .then((rss) => {
          console.log(rss)
          setRSS(rss.items);
          setLoading(false);
          setRefreshing(false)

        });
    }
    catch (err) {
      console.log("error in rss", err);
      setLoading(false);
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = async () => {
    console.log("refreshing NEWS")
    setRefreshing(true);
    await fetch('https://www.coindesk.com/feed')
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        setRefreshing(false);
        setRSS(rss.items);
      });
  }


  const viewProps = {
    ...props,
    RSS,
    loading,
    onRefresh,
    refreshing
  };

  return <NewsView {...viewProps} />;
};

export default News;
