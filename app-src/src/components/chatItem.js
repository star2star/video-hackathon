import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
//import { withTheme } from 'styled-components';
import FlatList from './flatList'
import moment from 'moment';

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
    const styles = {};
    return styles[styleName];
  }

  render(){

    const ContainerView = styled.View`
      align-items: ${this.props.isMe && this.props.isMe === true ? 'flex-end' : 'flex-start'};
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      //width: 100%;
      width: 210px;
    `;
    const MessageContainer = styled.View`
      align-items: flex-end;
      background-color: ${this.props.isMe && this.props.isMe === true ? '#862e9c' : '#2b8a3e'};
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      margin: ${this.props.isMe && this.props.isMe === true ? '10px 0px 10px 10px' : '10px 10px 10px 0px'};
      padding: 10px;
      position: relative;
      width: 80%
    `;
    const MessageTriangle = styled.View`
      position: absolute;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: ${this.props.isMe && this.props.isMe === true ? '12px solid #862e9c' : '12px solid #2b8a3e'};
      left: ${this.props.isMe && this.props.isMe === true ? '168px' : '-12px'};
      bottom: 10px;
      transform: ${this.props.isMe && this.props.isMe === true ? 'rotate(0deg)' : 'rotate(180deg)'};
      width: 0;
      height: 0;

    `;
    const MessageText = styled.View`
      color: #faf8f9;
      font-size: 12px;
    `;
    const UserTimeContainer = styled.View`
      display: flex;
      flex-direction: row;
      margin-top: 10px;
    `;
    const UserText = styled.Text`
      color: #faf8f9;
      font-size: 10px;
      text-transform: capitalize;

    `;
    const TimeText = styled.Text`
      color: #faf8f9;
      font-size: 10px;
    `;

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
              <UserText>
                {this.props.user.firstname}
                &nbsp;
              </UserText>
              <TimeText>
                {moment(this.props.timestamp).format('LLL')}
              </TimeText>
            </UserTimeContainer>
            <MessageTriangle>
              &nbsp;
            </MessageTriangle>
          </MessageContainer>

        </ContainerView>
    );
  }
}

export default ChatItem;
