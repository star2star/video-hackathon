//TODO style using style components
//add more functionality and learn more about the API

import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet } from 'react-native';
import { fromJS } from "immutable";
import { OpenTokSDK } from 'opentok-accelerator-core';

const credentials = {
  "apiKey": "45992462",
  "sessionId": "2_MX40NTk5MjQ2Mn5-MTUwOTczMDQ0MTA4Mn5qNnU0WmwycHZUWXBvdHhjeFBMaElNdDN-UH4",
  "token": "T1==cGFydG5lcl9pZD00NTk5MjQ2MiZzaWc9OGIyNzM1MGU1OGU2ZDc4MTc5M2ExZTRiODQ4YWUwNTI4NzIwMWRjNTpzZXNzaW9uX2lkPTJfTVg0ME5UazVNalEyTW41LU1UVXdPVGN6TURRME1UQTRNbjVxTm5VMFdtd3ljSFpVV1hCdmRIaGplRkJNYUVsTmRETi1VSDQmY3JlYXRlX3RpbWU9MTUwOTczMDQ2NCZub25jZT0wLjk5NTIzNzA5NzY4OTYxNzImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUxMjMyNjA2OSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="
};

const callProperties = {
  insertMode: 'append',
  width: '100%',
  height: '100%',
  showControls: false
};

const subscribeProperties = {
  insertMode: 'append',
  width: '100px',
  height: '100px',
  showControls: false
};


const otSDK = new OpenTokSDK(credentials);

const propTypes = {

};

const defaultProps = {

};

const styles = StyleSheet.create({

});


class VideoTest extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      session: null,
      connected: false,
      active: false,
      publishers: null,
      subscribers: null,
      meta: null,
      streamMap: null,
      localPublisherId: null,
      localAudioEnabled: true,
      localVideoEnabled: true
    };
    this.startCall = this.startCall.bind(this);

    this.displayName = 'MyComponent';

  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  componentDidMount() {
    const session = otSDK.session;
    otSDK.connect().then(() => this.setState({ session, connected: true }));
  }


  componentWillUnmount() {
  }

  handleDismissClick() {
  }

  startCall() {
    const { session, streamMap } = this.state;

    const subscribeToStream = stream => {
      if (streamMap && streamMap[stream.id]) { return; }
      const type = stream.videoType;
      otSDK.subscribe(stream, `screenSubscriberContainer`, subscribeProperties)
      .then(() => this.setState(otSDK.state()));
    };


    // Subscribe to initial streams
    session.streams.forEach(subscribeToStream);

    // Subscribe to new streams and update state when streams are destroyed
    otSDK.on({
      'streamCreated' : ({ stream }) => subscribeToStream(stream),
      'streamDestroyed': ({ stream }) => this.setState(otSDK.state())
    });

    // Publish local camera stream
    otSDK.publish('cameraPublisherContainer', callProperties)
    .then((publisher) => {
      this.setState(Object.assign({}, otSDK.state(), { localPublisherId: publisher.id }));
    }).catch(error => console.log(error));

    this.setState({ active: true });
  }

  getDefaultStyle(styleName) {
    const styles = {

    };

    return styles[styleName];
  }





  render(){
    //console.log('>>>>',this.state);
    return(
      <View style={{ "height": "100%", "width":"100%"}}>
        <View  style={{ "height": "100%", "width":"100%"}} id="cameraPublisherContainer">

        </View>
        <View style={{"flexDirection": "row"}} id="screenSubscriberContainer">

        </View>
        <View style={{"color":"yellow"}} onClick={this.startCall}>
          Click to open video
        </View>
      </View>
      );
  }
}

export default VideoTest;
