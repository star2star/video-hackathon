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
import styled from 'styled-components/native';




//react natives style sheet
// const styles = StyleSheet.create({
//
// });

const ButtonContainerStyles = styled.TouchableOpacity`
  background-color: '#005496'
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  border-radius: 4px;
  position: relative;
`;

const ButtonContainerHoverStyles = styled.TouchableOpacity`
  background-color: #00213c;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  border-radius: 4px;
`;

class Button extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      'hoverActive': false,
    };
    this.displayName = 'Button';

    this.ButtonElement;

    this.setHoverTrue = this.setHoverTrue.bind(this);
    this.setHoverFalse = this.setHoverFalse.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  static propTypes = {
    cbOnButtonClick: React.PropTypes.func,
    compStyle: React.PropTypes.object,
    buttonLabel: React.PropTypes.string,
    buttonCompanion: React.PropTypes.string,
    showLabel: React.PropTypes.bool,
    showCompanion: React.PropTypes.bool,
    toolTipPosition: React.PropTypes.string
  };

  static defaultProps = {
    cbOnButtonClick: ()=>{console.log('BUTTON CLICKED');},
    buttonLabel: 'Button Example',
    buttonCompanion: '',
    showLabel: true,
    showCompanion: true,
    toolTipPosition: 'right'
  };

  setHoverTrue(){
    ComponentUtilities.hoverUtility(this, true, {hoverActive: true});
  }

  setHoverFalse(){
    ComponentUtilities.hoverUtility(this, false, {hoverActive: false});
  }

  render(){

    console.log("this.ButtonContainerStyles",ButtonContainerStyles)


    // Defining different component style objects
    // const ButtonContainerStyles = styled.TouchableOpacity`
    //   background-color: '#005496'
    //   height: 40px;
    //   display: flex;
    //   flex-direction: row;
    //   align-items: center;
    //   justify-content: center;
    //   padding: 0px 8px;
    //   border-radius: 4px;
    //   position: relative;
    // `;

    // const ButtonContainerHoverStyles = styled.TouchableOpacity`
    //   background-color: #00213c;
    //   height: 40px;
    //   display: flex;
    //   flex-direction: row;
    //   align-items: center;
    //   justify-content: center;
    //   padding: 0px 8px;
    //   border-radius: 4px;
    // `;

    const ButtonViewStyles = styled.View`
      width: 100%;
      height: 48px;
      background-color: #f8f9fa
    `

    const ButtonTextStyles = styled.Text`
      font-size: 16px;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      color: #f8f9fa;
    `;

    const DisplayNoneStyles = styled.View`
      display: none;
    `;

    const DisplayToolTipStyles = styled.View`

    `;

    const SetButtonViewStyle = this.props.showCompanion ? ButtonViewStyles : DisplayNoneStyles;
    const SetButtonTextStyle = this.props.showLabel ? ButtonTextStyles : DisplayNoneStyles;
    const SetButtonHoverTextStyle = this.props.showLabel ? ButtonTextStyles : DisplayToolTipStyles;

    const SetButtonTextHover = this.state.hoverActive ? SetButtonHoverTextStyle : SetButtonTextStyle;
    const SetButtonContainerHover = this.state.hoverActive ? ButtonContainerHoverStyles : ButtonContainerStyles;

    const ButtonContainerView = SetButtonContainerHover;
    const ButtonView = SetButtonViewStyle;
    const ButtonText = SetButtonTextHover;

    //buttonCompanionItem needs to return an svg but that isn't supported
    return(
        <ButtonContainerView
            className="buttonContainer"
            accessibilityComponentType = 'button'
            accessibilityLabel = {this.props.buttonLabel}
            accessible
            onPress={this.props.cbOnButtonClick}
            onMouseEnter = {this.setHoverTrue}
            onMouseLeave = {this.setHoverFalse}
            ref = {(elm) => this.ButtonElement = elm}
          >
          <ButtonView className="buttonCompanionItem"/>
          <ButtonText className="buttonText">
            {this.props.buttonLabel}
          </ButtonText>
        </ButtonContainerView>
      );
  }
}

Button.ButtonContainerStyles = ButtonContainerStyles;
Button.ButtonContainerHoverStyles = ButtonContainerHoverStyles
export default Button;
