// Simple app component that uses react native element (View/Text/StyleSheet)
// TODO - styling with styled-components (for native), import and use s2s-components
//    i.e. import MenuListItem from 's2s-menuListItem/native'

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
import styled from 'styled-components/native';


const propTypes = {
  cbOnClick: React.PropTypes.func,
  compStyle: React.PropTypes.object,
  menuListItemLabel: React.PropTypes.string,
  menuListItemCompanion: React.PropTypes.string,
  isDisabled: React.PropTypes.bool
};

const defaultProps = {
  cbOnClick: ()=>{console.log('MENU LIST ITEM CLICKED');},
  menuListItemLabel: 'MenuListItem Example',
  menuListItemCompanion: '',
  isDisabled: false
};

//react natives style sheet
// const styles = StyleSheet.create({
//
// });

class MenuListItem extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      'hoverActive': false,
    };
    this.displayName = 'MenuListItem';

    this.MenuListItemElement;

    this.setHoverTrue = this.setHoverTrue.bind(this);
    this.setHoverFalse = this.setHoverFalse.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getDefaultStyle(styleName) {
    const styles = {
      menuListItemContainerStyles: styled.TouchableOpacity`
        background-color: #f8f9fa;
        height: 40px;
        width: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0px 8px;
        border-radius: 4px;
        position: relative;
        border-left: 4px solid #f8f9fa;
      `,
      menuListItemContainerHoverStyles: styled.TouchableOpacity`
        background-color: #e9ecef;
        height: 40px;
        width: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0px 8px;
        position: relative;
        border-radius: 4px;
        border-left: 4px solid #adb5bd;
      `,
      menuListItemContainerActiveStyles: styled.TouchableOpacity`
        background-color: #f8f9fa;
        height: 40px;
        width: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0px 8px;
        position: relative;
        border-radius: 4px;
        border-left: 4px solid #228ae6;
      `,
      menuListItemViewStyles: styled.View`
        width: 100%;
        height: 48px;
        background-color: #495057;
        opacity: 0.5
      `,
      menuListItemTextStyles: styled.Text`
        position: absolute;
        font-size: 16px;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        color: #495057;
      `,
      displayNoneStyles: styled.View`
        display: none;
      `,
    };
    return styles[styleName];
  }

  setHoverTrue(){
    ComponentUtilities.hoverUtility(this, true, {hoverActive: true});
  }

  setHoverFalse(){
    ComponentUtilities.hoverUtility(this, false, {hoverActive: false});
  }

  render(){
    const setMenuListItemHoverTextStyle = this.props.hoverActive ? 'menuListItemTextStyles' : 'displayNoneStyles';
    const setMenuListItemContainerHover = this.state.hoverActive ? 'menuListItemContainerHoverStyles' : 'menuListItemContainerStyles';

    const setMenuListItemCompanionDisabledStyle = this.props.isDisabled ? 'menuListItemViewDisabledStyles' : 'menuListItemViewStyles';
    const setMenuListItemContainerDisabled = this.props.isDisabled ? 'menuListItemContainerDisabledStyles' : setMenuListItemContainerHover ;

    const MenuListItemContainerView = this.getDefaultStyle(setMenuListItemContainerDisabled);
    const MenuListItemView = this.getDefaultStyle(setMenuListItemCompanionDisabledStyle);
    const MenuListItemText = this.getDefaultStyle(setMenuListItemHoverTextStyle);

    //console.log('MENU LIST ITEM', this.props);
    //menuListItemCompanionItem needs to return an svg but that isn't supported
    return(
        <MenuListItemContainerView
            className="menuListItemContainer"
            accessibilityComponentType = 'menuListItem'
            accessibilityLabel = {this.props.menuListItemLabel}
            accessible
            onPress={this.props.isDisabled ? undefined : this.props.cbOnClick}
            onMouseEnter = {this.setHoverTrue}
            onMouseLeave = {this.setHoverFalse}
            ref = {(elm) => this.MenuListItemElement = elm}
          >
          <MenuListItemView className="menuListItemCompanionItem">
            {this.props.menuListItemCompanion}
          </MenuListItemView>
          <MenuListItemText className="menuListItemText">
            {this.props.menuListItemLabel}
          </MenuListItemText>
        </MenuListItemContainerView>
      );
  }
}

export default MenuListItem;
