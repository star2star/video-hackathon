import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components';
import Button from './button'

/*
NOTES:
- Using react-native Button component until button ready.
- React-Native button is basically uncustomizeable style-wise.
- s2s-base-class getCompStyle/getStyle is not working fully could be due to styled-components being strings and react styles being objects
- TODO theming
*/

const propTypes = {
  cbToggleSettings : React.PropTypes.func
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
    this.state = {};
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

    const HeaderContainerView = styled.View`
      align-items: center;
      background-color: ${props => props.theme.headerContainerBackgroundColor};;
      display: flex;
      flex-direction: row;
      height: 50px;
      justify-content: flex-end;
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    `;
    const HeaderText = styled.View`
      align-items: center;
      color: ${props => props.theme.headerTextColor};
      display: flex;
      flex: 5
      justify-content: center;
    `;

    const defaultTheme = {
      headerContainerBackgroundColor: '#005496',
      headerTextColor: '#faf8f9'
    }

    return(
      <ThemeProvider theme={defaultTheme}>
        <HeaderContainerView  className="HeaderContainer" >
          <HeaderText className="HeaderText">
            Video Hackathon 📹 🔥
          </HeaderText>
          <Button
            className="buttonContainerStyles"
            cbOnButtonClick={this.toggleSettings}
            compStyle={this.getStyle('menuButton')}
            buttonLabel="SETTINGS"
            buttonCompanion = ''
            showLabel
            showCompanion = {false}
          />
        </HeaderContainerView>
      </ThemeProvider>
      );
  }
}

export default Header;
