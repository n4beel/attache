import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Button, ActivityIndicator } from 'react-native';
import theme from '../../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomBackButtonHeader } from '../../../components/Header';
import YoutubePlayer from "react-native-youtube-iframe";
const { height, width } = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

const VideoScreenView = (props) => {

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <>
      <CustomBackButtonHeader
        title={'Education'}
        backFunction={props.navigation.goBack}
      />
      <View style={styles.container}>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={props.route.params.videoId}
          onChangeState={onStateChange}
          webViewProps={{
            onLoad: () => props.setVisible(false),
            onLoadStart: () => props.setVisible(true)
          }}
        />
        {
          props.visible
            ? <View style={styles.centerMessage}>
              <ActivityIndicator size="large" color={theme.color.primary} />
            </View>
            : null
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: 'white',
  },

  centerMessage: {
    position: 'absolute',
    flex: 1,

    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default VideoScreenView;
