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

/*
TODO:
- Switch out buttons.



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
        flexDirection: row;
        height: 50px;
        justifyContent: flex-end;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
      `,
      secondaryContainerStyles: styled.View`
        display: flex;
        flex: 5;
        flexDirection: row;
        justifyContent: space-between;
      `,
      headerTextStyles: styled.View`
        alignItems: center;
        color: ${props => props.theme.headerTextColor};;
        display: flex;
        flex: 5
        justifyContent: center;
      `,
      buttonStyles: {
        buttonContainerStyles: styled.TouchableOpacity`  `,
        buttonViewStyles: styled.View`  `,
        buttonTextStyles: styled.Text`  `,
        displayNoneStyles: styled.View`  `,
      }
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

    const darkTheme = {
      headerContainerBackgroundColor: '#343a40',
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
                cbOnButtonClick={this.toggleSettings}
                compStyle = {this.getStyle('buttonStyles')}
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