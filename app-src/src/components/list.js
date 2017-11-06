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
  FlatList,
  SectionList
} from 'react-native';
import ComponentUtilities from '../js/componentUtilities';
import styled from 'styled-components/native';


const propTypes = {
  compStyle: React.PropTypes.object,
  hasSections: React.PropTypes.bool,
  listData: React.PropTypes.object,
  listItem: React.PropTypes.object,
  renderSectionHeader: React.PropTypes.object,
  sections: React.PropTypes.object
};

const defaultProps = {
  hasSections: false,
  listData: {},
  listItem: {}
};

//react natives style sheet
// const styles = StyleSheet.create({
//
// });

class List extends S2SBaseComponent {
  constructor(props){
    super(props);

    this.displayName = 'List';

    this.ButtonElement;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getDefaultStyle(styleName) {
    const styles = {
      listContainerStyles: styled.View`
        background-color: ${
          this.props.compStyle && this.props.compStyle.buttonContainerStyles.backgroundColor ?
          this.props.compStyle.buttonContainerStyles.backgroundColor :
          '#f8f9fa'
        };
        height: 100%;
        width: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0px 8px;
        border-right: #dee2e6;
      `,
      flatListStyle: styled.FlatList`

      `,
      sectionListStyle: styled.SectionList`

      `,
    };
    return styles[styleName];
  }


  render(){
    const ListContainerView = this.getDefaultStyle('listContainerStyles');
    const StyledFlatList = this.getDefaultStyle('flatListStyle');
    const StyledSectionList = this.getDefaultStyle('sectionListStyle');

    const ListToDisplay = this.props.hasSections ? StyledFlatList : StyledSectionList;

    console.log(this.props);
    //buttonCompanionItem needs to return an svg but that isn't supported
    return(
      <ListContainerView>
        <ListToDisplay
            data = {this.props.listData}
            renderItem = {this.props.listItem}
            renderSectionHeader = {this.props.renderSectionHeader}
            sections = {this.props.sections}
        />
      </ListContainerView>
    );
  }
}

export default List;
