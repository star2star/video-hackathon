import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, button} from 'react-native';
import styled from 'styled-components/native';
import { withTheme, extend, css } from 'styled-components';
import FlatList from './flatList'
import ChatItem from './chatItem';
import Button from './button';
import SimpleButton from './simpleButton'; // Only here to demonstrate how to override styles with styled-components.
import moment from 'moment';

/*
NOTES:
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

class ChatPanel extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
      isDisplayed: this.props.isDisplayed
    };
    this.displayName = 'ChatPanel';

    this.springValue = new Animated.Value(0);
    this.spring = this.spring.bind(this);
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
    const styles = {};
    return styles[styleName];
  }

  spring(doClose) {
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

  createMessageList(){
    let dateList= [];
    this.props.chatList.forEach((message)=>{
      const datecheck = dateList.filter((date)=>{
         return date === moment(message.timestamp).format('MMMM DD, YYYY')
       }).length
       if(datecheck === 0){
         dateList.push(moment(message.timestamp).format('MMMM DD, YYYY'))
       }
       const sectionedDateList = dateList.map((date)=>{
         return {
           sectionHeader: date,
           data: message
         }
         // {
         //   sectionHeader: {Component to be rendered as header},
         //   data: [],
         // }
       })
       console.log(sectionedDateList)
    })
    console.log('CHAT LIST', this.props.chatList, dateList)
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

  render(){

    const ContainerView = styled.View`
      background-color: #faf8f9;
      display: flex;
      flex-direction: column;
      width: 30%;
    `;
    const ChatPanelHeader = styled.View`
      align-items: center;
      background-color: #1878c7;
      color: #faf8f9;
      display: ${this.state.isDisplayed && this.state.isDisplayed === true ? 'flex' : 'none'}; // NOTE: This ternerary is here to prevent the "Chat" text from being visible while Chat is collapsed.
      flex-direction: row;
      height: 5%;
      justify-content: space-between;
    `;
    const ChatPanelText = styled.Text`
      display: flex;
      flex: 5;
      justify-content: center;
    `;
    const MessageListView = styled.View`
      display: ${this.state.isDisplayed && this.state.isDisplayed === true ? 'flex' : 'none'}; // NOTE: This ternerary is here to prevent the "Chat" text from being visible while Chat is collapsed.
      margin: 20px;
    `;

    // Here, I am trying to prove that I can style a simple component (component styles are basic)
    const DefaultSimpleButton = ({ style, children }) => (
      <SimpleButton
        style={style} // Passing down the magic override className to SimpleButton
        buttonLabel="Close"
        cbOnButtonClick={this.props.cbClosePanel}
        buttonCompanion = ''
        showLabel
        showCompanion = {false}
      >
        {children}
      </SimpleButton>

    );

    const StyledSimpleButton = styled(DefaultSimpleButton)`
      background-color: red;
    `

    const DefaultButton = ({ style, children }) => {

      console.log('style', style, children)
      return (
        <Button
          style={style} // defining styles are passed down per documentation (react-native)
          buttonLabel="X"
          cbOnButtonClick={this.props.cbClosePanel}
          buttonCompanion = ''
          showLabel
          showCompanion = {false}
        >
          {children}
        </Button>
      )
    };

    const StyledIntenseButton = styled(DefaultButton)`
      background-color: red;
      border: 5px solid purple;
      padding: 5px;

      :nth-child(1) : {
        background-color: blue;
      }

    `



    const AnimatedView = Animated.createAnimatedComponent(ContainerView);

    return(
        <AnimatedView style={{ width: this.springValue }} >
          <ChatPanelHeader  className="HeaderContainer" >
            <ChatPanelText>
              Chat
            </ChatPanelText>
            <StyledIntenseButton />
            <StyledSimpleButton/>
          </ChatPanelHeader>
          <MessageListView>
            {this.createMessageList()}
          </MessageListView>
        </AnimatedView>
    );
  }
}

export default ChatPanel;
