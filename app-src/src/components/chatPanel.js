import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components';

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
      isDisplayed : this.props.isDisplayed
    };
    this.displayName = 'ChatPanel';

  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.displayState !== this.props.displayState) {
      this.setState((prevState)=>{
        return {...prevState, displayState : nextProps.displayState};
      });
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleDismissClick() {

  }


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

  render(){

    const ContainerView = this.getStyle('containerStyles');
    const ChatPanelHeader = this.getStyle('chatPanelHeaderStyles');
    const ChatPanelText = this.getStyle('chatPanelTextStyles');

    const defaultTheme = {
      headerContainerBackgroundColor: '#005496',
      headerTextColor: '#faf8f9'
    }

    return(
      <ThemeProvider theme={defaultTheme}>
        <ContainerView>
        <ChatPanelHeader  className="HeaderContainer" >
          <ChatPanelText>
            Chat
          </ChatPanelText>
        </ChatPanelHeader>
        </ContainerView>
      </ThemeProvider>
    );
  }
}

export default ChatPanel;
