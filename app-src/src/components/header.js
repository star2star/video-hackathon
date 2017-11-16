import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components';
import Button from './button';
import Settings from './settings';

const styles = StyleSheet.create({
  HeaderText: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    flex: '5',
    justifyContent: 'center'
  },
  HeaderContainer: {
    alignItems: 'center',
    backgroundColor: '#0C5592',
    display: 'flex',
    flexDirection:  'row',
    height: '50px',
    justifyContent: 'flex-end',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px'
  }
});

const propTypes = {
  cbToggleSettings : React.PropTypes.func,
  settingsOpen :   React.PropTypes.bool
};

const defaultProps = {
  cbToggleSettings : ()=>{ console.log('Please define a callback function for cbToggleSettings. Thanks.'); },
  theme: {
    headerContainerBackgroundColor: '#005496',
    headerTextColor: '#faf8f9'
  }
};

class Header extends S2SBaseComponent {
  constructor(props){
    super(props);
    this.state = {
    };
    this.displayName = 'Header';

    this.toggleSettings = this.toggleSettings.bind(this);

  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleDismissClick() {}

  toggleSettings() {

    this.props.cbToggleSettings();
  }



  getDefaultStyle(styleName) {
    const styles = {};
    return styles[styleName];
  }

  render(){
    console.log(">>>", this.state.settingsOpen)
    return(
        <View  className="HeaderContainer" style={styles.HeaderContainer} >
          <View className="HeaderText" style={styles.HeaderText}>
            Video Hackathon 📹 🔥
          </View>
          <View>
          <Button
            className="buttonContainerStyles"
            cbOnButtonClick={this.toggleSettings}
            compStyle={this.getStyle('menuButton')}
            buttonLabel="SETTINGS"
            buttonCompanion = ''
            showLabel
            showCompanion = {false}
          />
          </View>
          <Settings
            isDisplayed={this.props.settingsOpen}
          />
        </View>
      );
  }
}

export default Header;
