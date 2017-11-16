import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, button} from 'react-native';
import styled from 'styled-components/native';
import { withTheme, extend, css } from 'styled-components';
import List from './list'
/*
NOTES:
- TODO theming
*/

// Temporary Data until the Chat API is configured


class Settings extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      isDisplayed: this.props.isDisplayed
    };
    this.displayName = 'Settings';

    this.springValue = new Animated.Value(0);
    this.spring = this.spring.bind(this);
  }

  static propTypes = {
    isDisplayed : React.PropTypes.func
  }

  static defaultProps = {
    isDisplayed : false
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    if(nextProps && nextProps.isDisplayed !== this.props.isDisplayed) {
      this.setState((prevState)=>{
        return {...prevState, isDisplayed : nextProps.isDisplayed};
      });
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps,prevState) {
    console.log('componentDidUpdate');
    if(prevProps.isDisplayed !== this.props.isDisplayed) {
      this.spring();
    }
  }

  componentWillUnmount() {}

  handleDismissClick() {}

  spring(doClose) {
    console.log(">>> SPRING");
    // Default Configs: isDisplayed true // show chatPanel is open/opening
    this.springValue.setValue(1);
    let animationConfigs = {
      toValue: 250,
      friction: 5,
      tension: 1
    }

    // isDisplayed false // chatPanel is closed or closing
    if(doClose || this.state.isDisplayed === false) {
      this.springValue.setValue(250);

      animationConfigs = {
        toValue: 0,
        friction: 5,
        tension: 1
      }
    }

    // Performing animation with updated configurations
    Animated.spring(
      this.springValue,
      animationConfigs
    ).start();

  }

  render(){
    console.log("SETTINGS", this.props.isDisplayed, this.state.isDisplayed);
    const ContainerView = styled.View`
      background-color: orange;
      display: flex;
      flex-direction: column;
      z-index: 9999:
      color: white;
      width: 40%;
      position: absolute;
      top: 90px;
      right: 40px;
    `;

    const SView = styled.View`
      display: ${this.state.isDisplayed && this.state.isDisplayed === true ? 'flex' : 'none'};
    `

    const AView = Animated.createAnimatedComponent(ContainerView);

    return(
      <AView style={{ height: this.springValue }}>
        <SView>
        settingsOpen
        </SView>
      </AView>
    );
  }
}

export default Settings;
