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

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleDismissClick() {

  }

  toggleSettings() {
    this.props.cbToggleSettings();
  }


  getDefaultStyle(styleName) {
    const styles = {
      headerContainerStyles: styled.View`
        align-items: center;
        background-color: ${props => props.theme.headerContainerBackgroundColor};;
        display: flex;
        flex-direction: row;
        height: 50px;
        justify-content: flex-end;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
      `,
      secondaryContainerStyles: styled.View`
        display: flex;
        flex: 5;
        flex-direction: row; // NOTE: Even though in the web, you can define 'display: flex' and the flex direction will be row by default, in react-native-web it has to be explicitly defined or it will not work.
        justify-content: space-between;
      `,
      headerTextStyles: styled.View`
        align-items: center;
        color: ${props => props.theme.headerTextColor};
        display: flex;
        flex: 5
        justify-content: center;
      `,
      menuButton: {
        buttonContainerStyles: {
          //backgroundColor: 'pink'
        },
        buttonViewStyles: {},
        buttonTextStyles: {},
        displayNoneStyles: {},
      },

    };
    return styles[styleName];
  }

  render(){

    const HeaderContainerView = this.getStyle('headerContainerStyles');
    const SecondaryContainerView = this.getStyle('secondaryContainerStyles');
    const HeaderText = this.getStyle('headerTextStyles');

    const defaultTheme = {
      headerContainerBackgroundColor: '#005496',
      headerTextColor: '#faf8f9'
    }

    return(
      <ThemeProvider theme={defaultTheme}>
        <HeaderContainerView  className="HeaderContainer" >
          <SecondaryContainerView>
            <HeaderText className="HeaderText">
              Video Hackathon
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
          </SecondaryContainerView>
        </HeaderContainerView>
      </ThemeProvider>
      );
  }
}

export default Header;
