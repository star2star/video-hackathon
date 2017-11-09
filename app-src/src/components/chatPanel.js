import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import List from './list'
import ChatItem from './chatItem';
import Button from './button';

/*
NOTES:
- s2s-base-class getCompStyle/getStyle is not working fully could be due to styled-components being strings and react styles being objects
- TODO theming
*/

// Temporary Data until the Chat API is configured
const chatProps = [
  {
    message: "Such video quality. Wow. Much impress.",
    user: {
      firstname: 'doge',
      lastname: 'dog',
      email: 'doge@gmail.come'
    },
    timestamp: Date.now(),
    isMe: false
  },
  {
    message: "I hate it.",
    user: {
      firstname: 'grumpy',
      lastname: 'cat',
      email: 'grumpycat@gmail.come'
    },
    timestamp: Date.now(),
    isMe: true
  },
  {
    message: "What if I told you nobody wanted to video chat with you.",
    user: {
      firstname: 'morpheus',
      lastname: 'matrix',
      email: 'morpheus@gmail.come'
    },
    timestamp: Date.now(),
    isMe: false
  }
]

const defaultProps = {
  cbToggleSettings : ()=>{ console.log('Please define a callback function for cbToggleSettings. Thanks.'); },
  chatList : chatProps,
  isDisplayed : false
};

class ChatPanel extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      isDisplayed: this.props.isDisplayed
    };
    this.displayName = 'ChatPanel';

    this.springValue = new Animated.Value(0);
    this.spring = this.spring.bind(this);
    this.closePanel = this.closePanel.bind(this);
  }

  static propTypes = {
    chatList : React.PropTypes.array,
    isDisplayed : React.PropTypes.func
  }

  static defaultProps = {
    cbToggleSettings : ()=>{ console.log('Please define a callback function for cbToggleSettings. Thanks.'); },
    chatList : chatProps, // NOTE: Should actually be an empty array but I'm faking out data
    isDisplayed : false
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.isDisplayed !== this.props.isDisplayed) {
      this.setState((prevState)=>{
        return {...prevState, isDisplayed : nextProps.isDisplayed};
      });
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps,prevState) {
    if(prevProps.isDisplayed !== this.props.isDisplayed) {
      this.spring();
    }
  }

  componentWillUnmount() {}

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
        display: ${this.state.isDisplayed && this.state.isDisplayed === true ? 'flex' : 'none'}; // NOTE: This ternerary is here to prevent the "Chat" text from being visible while Chat is collapsed.
        flex-direction: row;
        height: 5%;
        justify-content: space-between;
      `,
      chatPanelTextStyles: styled.Text`
        display: flex;
        flex: 5;
        justify-content: center;
      `,

      // TODO We can't override styles
      chatPanelButtonStyles: styled.Button`
        align-items: center;
        justify-content: center;
      `,
      messageLisViewStyles: styled.View`
        display: ${this.state.isDisplayed && this.state.isDisplayed === true ? 'flex' : 'none'}; // NOTE: This ternerary is here to prevent the "Chat" text from being visible while Chat is collapsed.
      `,
    };
    return styles[styleName];
  }

  spring() {
    // Default Configs: isDisplayed true // show chatPanel is open/opening
    this.springValue.setValue(1);
    let animationConfigs = {
      toValue: 250,
      friction: 5,
      tension: 1
    }

    // isDisplayed false // chatPanel is closed or closing
    if(this.state.isDisplayed === false) {
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

  createMessageList(){
    return this.props.chatList && this.props.chatList.map((message)=>{
      return (
        <ChatItem
          user={message.user}
          timestamp={message.timestamp}
          isMe={message.isMe}
          message={message.message}
        />
      )
    })
  }

  closePanel(){
    // TODO make close

    this.setState((prevState)=>{
      return {...prevState, isDisplayed : false }
    });

  }

  render(){

    const ContainerView = this.getStyle('containerStyles');
    const ChatPanelHeader = this.getStyle('chatPanelHeaderStyles');
    const ChatPanelText = this.getStyle('chatPanelTextStyles');
    const MessageListView = this.getStyle('messageLisViewStyles');
    const ChatPanelButton = this.getStyle('chatPanelButtonStyles');

    const defaultTheme = {
      headerContainerBackgroundColor: '#005496',
      headerTextColor: '#faf8f9'
    }

    const AnimatedView = Animated.createAnimatedComponent(ContainerView);
    //console.log('ChatPanel props:',this.props)

    return(
        <AnimatedView style={{  width: this.springValue}} >
          <ChatPanelHeader  className="HeaderContainer" >
            <ChatPanelText>
              Chat
            </ChatPanelText>
            <Button
              buttonLabel="X"
              cbOnButtonClick={this.closePanel}
            />
          </ChatPanelHeader>
          <MessageListView>
            {this.createMessageList()}
          </MessageListView>
        </AnimatedView>
    );
  }
}

export default ChatPanel;
