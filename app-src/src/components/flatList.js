// Simple app component that uses react native element (View/Text/StyleSheet)
// TODO - styling with styled-components (for native), import and use s2s-components
//    i.e. import Button from 's2s-button/native'

import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native';
import ComponentUtilities from '../js/componentUtilities';


const propTypes = {
  compStyle: React.PropTypes.object,
  listData: React.PropTypes.object,
  listItem: React.PropTypes.any
};

const defaultProps = {
  listData: {},
  listItem: {}
};

//react natives style sheet
const styles = StyleSheet.create({
  listContainerStyles: {
    backgroundColor: '#f8f9fa',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
    margin: '0px',
    borderRight: '#dee2e6',
  },
  flatListStyle: {}
});

class FlatList extends S2SBaseComponent {
  constructor(props){
    super(props);

    this.displayName = 'FlatList';

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount(){}

  componentWillUnmount(){}

  renderItem(listData){
    return listData.map((listItem)=>{
      return this.props.listItem(listItem);
    });
  }


  render(){
    return(
      <View style = {styles.listContainerStyles} >
        <ScrollView style = {styles.flatListStyle} >
          {
            this.renderItem(this.props.listData)
          }
        </ScrollView>
      </View>
    );
  }
}

export default FlatList;
