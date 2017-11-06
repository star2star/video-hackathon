import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components';
import Header from './header';
import List from './list';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose';

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
    flexDirection: 'row'
  },
  textStyles: {}
});


class AppMain extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.displayName = 'AppMain';

  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleDismissClick() {}

  getDefaultStyle(styleName) {
    const styles = {

    };

    return styles[styleName];
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
                listData = {{}}
                listItem = {{}}
              />
            </View>
            <Text>
              TODO Import child components
            </Text>
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
