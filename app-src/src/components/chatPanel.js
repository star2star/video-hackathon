import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components';
import List from './list'

/*
NOTES:
- Using react-native Button component until button ready.
- React-Native button is basically uncustomizeable style-wise.
- s2s-base-class getCompStyle/getStyle is not working fully could be due to styled-components being strings and react styles being objects
- TODO theming
- TODO Add Props for child chat components.
*/

const propTypes = {
  isDisplayed : React.PropTypes.func
};

const defaultProps = {
  cbToggleSettings : ()=>{ console.log('Please define a callback function for cbToggleSettings. Thanks.'); },
  isDisplayed : false
};

class ChatPanel extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      //isDisplayed : this.props.isDisplayed
    };
    this.displayName = 'ChatPanel';

    this.springValue = new Animated.Value(0.3);
    this.spring = this.spring.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.displayState !== this.props.displayState) {
      this.setState((prevState)=>{
        return {...prevState, displayState : nextProps.displayState};
      });
    }
  }

  componentDidMount() {}

  componentWillUnmount() {


  }

  handleDismissClick() {}

  getDefaultStyle(styleName) {
    const styles = {
      containerStyles: styled.View`
        background-color: #faf8f9;
        display: flex;
        flex-direction: column;
        width: 30%;

      `,
      chatPanelHeaderStyles: styled.View`
        align-items: center;
        background-color: #1878c7;
        color: #faf8f9;
        display: flex;
        flex-direction: column;
        height: 5%;
        vertical-align: center;
      `,
      chatPanelTextStyles: styled.Text`
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
      `,
    };
    return styles[styleName];
  }

  spring() {
    this.springValue.setValue(0.3);
    Animated.spring(
      this.springValue,
      {
        toValue: 250,
        friction: 5,
        tension: 1
      }
    ).start()
  }

  render(){

    const ContainerView = this.getStyle('containerStyles');
    const ChatPanelHeader = this.getStyle('chatPanelHeaderStyles');
    const ChatPanelText = this.getStyle('chatPanelTextStyles');

    const defaultTheme = {
      headerContainerBackgroundColor: '#005496',
      headerTextColor: '#faf8f9'
    }

    const AnimatedView = Animated.createAnimatedComponent(ContainerView);
    //console.log('ChatPanel props:',this.props)

    return(
      <ThemeProvider theme={defaultTheme}>
      {this.props.isDisplayed === true ?
        (
        <AnimatedView
          onLayout={()=>{
            this.spring();
          }}
          style={{width: this.springValue}}
        >
          <ChatPanelHeader  className="HeaderContainer" >
            <ChatPanelText>
              Chat
            </ChatPanelText>
          </ChatPanelHeader>
        </AnimatedView>
        ) :
        <View></View>
      }
      </ThemeProvider>
    );
  }
}

export default ChatPanel;
