import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import ComponentUtilities from '../js/componentUtilities';
import styled from 'styled-components/native';

// NOTE: I created this component solely as a way to test overriding component styles with styled-components. The only step in component definition is to pass the this.props.style to the style property. As seen on Line 31 

class SimpleButton extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      'hoverActive': false,
    };
    this.displayName = 'SimpleButton';

    this.ButtonElement;

    this.setHoverTrue = this.setHoverTrue.bind(this);
    this.setHoverFalse = this.setHoverFalse.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  static propTypes = {};

  static defaultProps = {};

  setHoverTrue(){
    ComponentUtilities.hoverUtility(this, true, {hoverActive: true});
  }

  setHoverFalse(){
    ComponentUtilities.hoverUtility(this, false, {hoverActive: false});
  }

  render(){

    // Defining different component style objects
    const ButtonContainerStyles = styled.TouchableOpacity`
      background-color: purple;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0px 8px;
      border-radius: 4px;
      position: relative;
    `;

    //buttonCompanionItem needs to return an svg but that isn't supported
    return(
        <ButtonContainerStyles
            style={this.props.style} // NOTE: Since this is react-native-web, we are technically in react-native therefore we must pass down style(which is simply styled-components classNames) to the STYLE property here.
            accessibilityComponentType = 'button'
            accessibilityLabel = {this.props.buttonLabel}
            accessible
            onPress={this.props.cbOnButtonClick}
            onMouseEnter = {this.setHoverTrue}
            onMouseLeave = {this.setHoverFalse}
            ref = {(elm) => this.ButtonElement = elm}
        >
            <Text>
              So Simple
            </Text>
        </ButtonContainerStyles>
      );
  }
}

export default SimpleButton;
