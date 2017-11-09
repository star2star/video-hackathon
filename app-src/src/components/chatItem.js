import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
//import { withTheme } from 'styled-components';
import List from './list'

/*
NOTES:
- s2s-base-class getCompStyle/getStyle is not working fully could be due to styled-components being strings and react styles being objects
- TODO theming
- TODO Add Props for child chat components.
*/

const propTypes = {

};

const defaultProps = {
  cbToggleSettings : ()=>{ console.log('Please define a callback function for cbToggleSettings. Thanks.'); },
};

class ChatItem extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.displayName = 'ChatItem';

  }

  getDefaultStyle(styleName) {
    const styles = {
      containerStyles: styled.View`
        align-items: ${this.props.isMe && this.props.isMe === true ? 'flex-end' : 'flex-start'};
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
      `,
      messageContainerStyles: styled.View`
        align-items: flex-end;
        //background-color: #2b8a3e;
        background-color: ${this.props.isMe && this.props.isMe === true ? '#862e9c' : '#2b8a3e'};
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        margin: 10px;
        padding: 10px;
        width: 80%
      `,
      messageTextStyles: styled.View`
        color: #faf8f9;
      `,
      userTimeContainer: styled.View`
        display: flex;
        flex-direction: row;
        margin-top: 10px;
      `,
      userTextStyles: styled.Text`
        color: #faf8f9;
        font-size: 12px;

      `,
      timeTextStyles: styled.Text`
        color: #faf8f9;
        font-size: 12px;
      `,
    };
    return styles[styleName];
  }

  render(){

    const ContainerView = this.getStyle('containerStyles');
    const MessageContainer = this.getStyle('messageContainerStyles');
    const MessageText = this.getStyle('messageTextStyles');
    const UserTimeContainer = this.getStyle('userTimeContainer');
    const UserText = this.getStyle('userTextStyles');
    const TimeText = this.getStyle('timeTextStyles');

    const defaultTheme = {
      headerContainerBackgroundColor: '#005496',
      headerTextColor: '#faf8f9'
    }

    //console.log('ChatItem props:',this.props)

    return(
        <ContainerView>
          <MessageContainer>
            <MessageText>{this.props.message}</MessageText>
            <UserTimeContainer>
            <UserText>{this.props.user.firstname}</UserText>
            <TimeText> freaking timestamp</TimeText>
            </UserTimeContainer>
          </MessageContainer>
        </ContainerView>
    );
  }
}

export default ChatItem;
