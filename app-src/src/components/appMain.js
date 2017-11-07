import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import { ThemeProvider } from 'styled-components';
import MenuListItem from './menuListItem';
import Header from './header';
import List from './list';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose';
import ChatPanel from './chatPanel';

const styles = StyleSheet.create({
  myComponentContainerStyles: {
    backgroundColor: 'gray',
    display: 'flex',
    width: '100%'
  },
  bodyStyle: {
    display: 'flex',
    height: 'calc(100vh - 50px)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyles: {}
});


class AppMain extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.displayName = 'AppMain';

    this.menuButtonArray = this.menuButtonArray.bind(this);
    this.itemToRender = this.itemToRender.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleDismissClick() {}

  getDefaultStyle(styleName) {
    const styles = {

    };

    return styles[styleName];
  }

  menuButtonArray(){

    return [
      {
        label: 'Make Call',
        companion: '*',
        isDisabled: false
      },
      {
        label: 'Share Screen',
        companion: '[]',
        isDisabled: true
      }
    ];
  }

  itemToRender(item){
    console.log('ITEMTORENDER ARG', item)

    return (
      <MenuListItem
          key={item.companion}
          cbOnClick = {()=>{
            console.log('ITEM Click', item);
          }}
          menuListItemLabel = {item.label}
          menuListItemCompanion = {item.companion}
          showCompanion
      />
    );
  }

  render(){

    return(
        <View  className="AppMainContainer"
            style={styles.myComponentContainerStyles}
        >
          <Header
            cbToggleSettings={()=>{
              console.log('Temporary cbFunction to cbToggleSettings in AppMain.js');
            }}
          />
          <View className="AppMainBody" style={styles.bodyStyle}>
            <View>
              <List
                compStyle = {{}}
                listData = {this.menuButtonArray()}
                listItem = {(item)=>{
                  console.log("APPMAIN LISTITEM ARG", item);
                  this.itemToRender(item);
                }}
              />
            </View>
            <Text>
              TODO Import child components
            </Text>
            <ChatPanel isDisplayed={true} />
          </View>
        </View>
      );
  }
}

const hocComponent = compose(injectIntl, connect((state, props)=>{
    return ({
      // TODO : Determine structure of store
    });
}));

export default AppMain;
