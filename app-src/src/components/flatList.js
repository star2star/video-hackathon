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
  ScrollView
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
// const styles = StyleSheet.create({
//
// });

class FlatList extends S2SBaseComponent {
  constructor(props){
    super(props);

    this.displayName = 'FlatList';
    this.ButtonElement;

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getDefaultStyle(styleName) {
    const styles = {
      listContainerStyles: {
        backgroundColor: '#f8f9fa',
        height: '100%',
        width: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px',
        borderRight: '#dee2e6',
      },
      flatListStyle: {}
    };
    return styles[styleName];
  }

  renderItem(listData){
    return listData.map((listItem)=>{
      return this.props.listItem(listItem);
    });
  }


  render(){

    return(
      <View style = {this.getStyle('listContainerStyles')} >
        <ScrollView style = {this.getStyle('flatListStyle')} >
          {
            this.renderItem(this.props.listData)
          }
        </ScrollView>
      </View>
    );
  }
}

export default FlatList;
