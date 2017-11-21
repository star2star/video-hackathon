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
  listItem: React.PropTypes.any,
  renderSectionHeader: React.PropTypes.object,
  sections: React.PropTypes.array
};

/*
  SHAPE OF SECTIONS:

  sections: [
    {
      sectionHeader: {Component to be rendered as header},
      data: [],
    },
    {
      sectionHeader: {Component to be rendered as header},
      data: [],
    }
  ]
*/

const defaultProps = {
  listItem: {},
  renderSectionHeader: {},
  sections: [
    {
      sectionHeader: {},
      data: [],
    }
  ]
};

//react natives style sheet
// const styles = StyleSheet.create({
//
// });

class SectionedList extends S2SBaseComponent {
  constructor(props){
    super(props);

    this.displayName = 'SectionedList';
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
      sectionListStyle: {},
      flatListStyle: {
        listContainerStyles: {},
        flatListStyle: {}
      },
    };
    return styles[styleName];
  }

  renderItem(listData){
    return listData.map((listItem)=>{
      return this.props.listItem(listItem);
    });
  }

  render(){
    //buttonCompanionItem needs to return an svg but that isn't supported
    return(
      <View>
        <ScrollView>
          {
            this.props.sections.map((section)=>{
              return (
                <View>
                  {this.props.renderSectionHeader(section.sectionHeader)}
                  {this.renderItem(section.data)}
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

export default SectionedList;
