import React, { useEffect, useState } from 'react';
import EducationView from './view';
import services from './../../../store/config/fetchConfig'

const Education = (props) => {

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(false)
  const [video, setVideo] = useState([])
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    (async () => {
      let res;
      try {
        res = await services.Get('video');
        if (res?.success === false) {
          setFetchError(true)
        }
        else {
          res = res.filter(item => (item.url.includes("https://www.youtube.com/")))
          setVideo(res);
          console.log("res", res);
        }
      }
      catch (err) {
        console.log("error while fetching education", err)
        setLoginError(true)
      }
      setLoading(false);

    })()
  }, [])


  const onRefresh = async () => {
    console.log("refreshing Education")
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  }

  const viewProps = {
    ...props,
    video,
    loginError,
    fetchError,
    onRefresh,
    refreshing,
    loading
  };

  return <EducationView {...viewProps} />;
};

export default Education;
