// Simple app component that uses react native element (View/Text/StyleSheet)
// TODO - styling with styled-components (for native), import and use s2s-components
//    i.e. import Button from 's2s-button/native'

import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet } from 'react-native';


const propTypes = {

};

const defaultProps = {

};

const styles = StyleSheet.create({
  myComponentContainerStyles: {
    backgroundColor: 'gray',
    width: '60%',
    height: '60%'
  },
  headingStyles: {
    width: '100%',
    height: '48px',
    backgroundColor: 'red'
  },
  textStyles: {
    color: 'black',
    fontSize: '12px'
  }
});


class MyComponent extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.displayName = 'MyComponent';

  }

  componentDidMount() {
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
        <View  className="myComponentContainer"
            style={styles.myComponentContainerStyles}
        >
          <View className="myComponentHeader" style={styles.headingStyles}>
            <Text className="myText" style={styles.textStyles}>
              Imported component!!!!
            </Text>
          </View>
        </View>
      );
  }
}

export default MyComponent;
