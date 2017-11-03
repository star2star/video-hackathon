// Simple app component that uses react native element (View/Text/StyleSheet)
// TODO - styling with styled-components (for native), import and use s2s-components
//    i.e. import Button from 's2s-button/native'

import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet } from 'react-native';

const otSDK = new OpenTokSDK(credentials);

const propTypes = {

};

const defaultProps = {

};

const styles = StyleSheet.create({

});


class MyComponent extends S2SBaseComponent {
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
    this.displayName = 'MyComponent';

  }

  componentDidMount() {
    const session = otSDK.session;
    otSDK.connect().then(() => this.setState({ session, connected: true }));
  }


  componentWillUnmount() {
  }

  handleDismissClick() {
  }

  getDefaultStyle(styleName) {
    const styles = {

    };

    return styles[styleName];
  }





  render(){
    return(
      <view className="App">

      </view>
      );
  }
}

export default MyComponent;
