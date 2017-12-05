//TODO max height needs to be added to flat list based off of the itemsVistable props

import React from 'react';
import S2SBaseComponent from 's2s-base-class';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native';
import ComponentUtilities from '../js/componentUtilities';
import FlatList from './flatList';

//react natives style sheet
const styles = StyleSheet.create({
  selectContainerStyle: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #dee2e6',
    borderLeft:  '1px solid #dee2e6',
    borderRight:  '1px solid #dee2e6',
    borderBottom:  '1px solid #dee2e6',
    borderRadius: '2px',
    display: 'flex',
    fontSize: '14px'
  },
  selectStyle:{
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    paddingTop: '5px',
    paddingRight: '5px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    //width: '100%',
    justifyContent: 'space-between',
    outline: 'none',
    width: '100%'
  },
  disabledSelectStyle: {
    backgroundColor: ' #f1f3f5',
    color: '#868e96',
    cursor: 'not-allowed'
  },
  hoverSelectStyle: {
    backgroundColor: '#e9ecef',
    borderTop: '1px solid #adb5bd',
    borderLeft: '1px solid #adb5bd',
    borderRight:  '1px solid #adb5bd',
    borderBottom:  '1px solid #adb5bd',
  },
  focusSelectStyle: {
    borderTop: '1px solid #228ae6',
    borderLeft:  '1px solid #228ae6',
    borderRight:  '1px solid #228ae6',
    borderBottom:  '1px solid #228ae6'
  },
  errorSelectStyle: {
    borderTop: '1px solid #e03131',
    borderLeft:  '1px solid #e03131',
    borderRight:  '1px solid #e03131',
    borderBottom:  '1px solid #e03131'
  },
  containerStyle:{
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  selectItem: {
    paddingTop: '5px',
    paddingRight: '0px',
    paddingBottom: '5px',
    paddingLeft: '0px',
    lineHeight: '25px',
    marginTop: '0px',
    marginRight: '3px',
    marginBottom: '0px',
    marginLeft: '3px',
    backgroundColor: '#f8f9fa',
    width: '100%',
    cursor: 'pointer'
  },
  hoverSelectItem:{
    backgroundColor: '#e9ecef'
  },
  listContainerStyles: {
    backgroundColor: '#f8f9fa',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '5px',
    paddingRight: '5px',
    borderRight: '#dee2e6',
  },
  listStyle: {
    width: '100%'
  },
  dropDownStyle: {
    backgroundColor: '#f8f9fa',
    borderTop:  '0px',
    borderLeft: '1px solid #dee2e6',
    borderBottom: '1px solid #dee2e6',
    borderRight: '1px solid #dee2e6',
    boxShadow: '0 2px 8px 0 rgba(32, 36, 40, 0.4)',
    cursor: 'pointer',
    fontSize: '14px',
    overflowX: 'auto',
    overflowY: 'auto',
    paddingTop: '5px',
    paddingRight: '0px',
    paddingBottom: '5px',
    paddingLeft: '0px',
    position: 'relative',
    width: '100%',
    top: '3px',
    zIndex: '10'
  }
});

class Select extends S2SBaseComponent {
  constructor(props){
    super(props);

    this.displayName = 'Select';
    this.state={
        isOpen: this.props.isOpen,
        selectedItem: this.props.defaultSelectedItem,
        hover: false,
        itemHovered: undefined
      };

    this.selectItem = this.selectItem.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.itemToRender = this.itemToRender.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.getSelectStyle = this.getSelectStyle.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.onItemHover = this.onItemHover.bind(this);
    this.onBlurToggle = this.onBlurToggle.bind(this);
    this.handleKeyDownSelect = this.handleKeyDownSelect.bind(this);
    this.handleKeyDownDropDownItem = this.handleKeyDownDropDownItem.bind(this);
  }

  static propTypes = {
    cbOnClick: React.PropTypes.func,
    cbValueChanged: React.PropTypes.func,
    compStyle: React.PropTypes.object,
    selectData: React.PropTypes.array,
    isOpen: React.PropTypes.bool,
    hasError: false,
    defaultSelectedItem: React.PropTypes.number,
    isDisabled:React.PropTypes.bool,
    itemsVisible :  React.PropTypes.number
  };

  static defaultProps = {
    cbOnClick: ()=>{console.log('cbOnClick is not defined');},
    cbValueChanged: ()=>{console.log('cbValueChanged is not defined');},
    compStyle: { },
    selectData: ['item1', 'item2','item3','item4'],
    isOpen: false,
    isDisabled: false,
    hasError: false,
    defaultSelectedItem: 0,
    itemsVisible: 2
  };


  componentDidMount(){}

  componentWillUnmount(){}

  selectItem(i){
    // NOTE: This setTimeout is necessary so that selectedItem in state gets properly set.
    setTimeout(()=>{
      this.setState(()=>{
        return { ...this.state, selectedItem: i }; //This function will not change is open becuase that will already toggle on blur
      });
    }, 0);
    if (this.props.cbValueChanged){
      this.props.cbValueChanged(this.props.selectData[i]);
    }
  }

  onBlurToggle(){
    if (this.state.isOpen){
      this.setState({ ...this.state, isOpen: !this.state.isOpen});
    }
  }

  onItemHover(item) {
    if(!this.state.hover){
      this.setState({ ...this.state, itemHovered:item, hover: true});
    }
  }

  renderItems(items){
    return items.map((item)=>{
      return this.itemToRender(item);
    });
  }

  itemToRender(item){
    const itemIndex = this.props.selectData.indexOf(item);
    const divOnMouseDown = ()=>{this.selectItem(itemIndex);};
    const divOnMouseOver = ()=>{this.onItemHover(itemIndex);};
    const divOnMouseLeave = ()=>{this.onMouseOut(itemIndex);}
    const divOnKeyDown = (e)=>{this.handleKeyDownDropDownItem(e, index);};

    const itemStyle = this.state.itemHovered === itemIndex ? [styles.selectItem, styles.hoverSelectItem] : styles.selectItem;
    return (
      <View
      accessible
      onMouseDown={divOnMouseDown}
      onMouseOver = {divOnMouseOver}
      onMouseLeave={divOnMouseLeave}
      onKeyDown={divOnKeyDown}
      style={itemStyle}>
        {item}
      </View>
    );
  }

  toggleSelect(){
    this.setState(()=>{
      return { ...this.state, isOpen: !this.state.isOpen };
    });
    setTimeout(()=>{this.props.cbOnClick();}, 0);
  }

  handleMouseEnter() {
    this.setState(()=>{
      return {...this.state, 'hover': true};
    });
  }

  onMouseOut() {
    if(this.state.hover){
      this.setState(()=>{
        return { ...this.state, 'hover': false, itemHovered: undefined};
      });
    }
  }

  getSelectStyle(){
    const errorStyle= this.props.hasError ? styles.errorSelectStyle : {}; //these three varriables are in place so we easily concatanate styles based off of props
    const hoverStyle= this.state.hover ? styles.hoverSelectStyle : {};
    const focusStyle= this.state.isOpen ? styles.focusSelectStyle : {};

    const selectContainerStyle = [styles.selectContainerStyle, hoverStyle, focusStyle, errorStyle];
    return selectContainerStyle;
  }

  handleKeyDownSelect(e){
    //TODO MODIFY CODE AND BEHAVIOR FOR DOWN ARROW KEY PRESS SEE S2S-SELECT
    switch (e.keyCode){
      case 32: // enter
        this.toggleSelect();
        break;
      case 13: // spacebar
        this.toggleSelect();
        break;
    }
  }

  handleKeyDownDropDownItem(e, index){
    //TODO MODIFY CODE AND BEHAVIOR FOR UP AND DOWN ARROW KEY PRESS SEE S2S-SELECT
    switch (e.keyCode){
      case 9: // tab
      case 32: // enter
      case 13: // spacebar
        this.selectItem(index);
        break;
    }
  }

  render(){
    const dynamicSVG = this.state.isOpen ? '💩' : '👽'; //SVGS are not currently ready
    console.log("????",this.refs);
    return(
      <Text
      style={styles.containerStyle}
      onBlur={this.onBlurToggle}>
        <Text
        accessible
        style={this.getSelectStyle()}
        className="selectArea"
        onMouseDown={this.props.isDisabled ? undefined : this.toggleSelect}
        onKeyDown={this.props.isDisabled ? undefined : this.handleKeyDownSelect}
        onMouseEnter={this.props.isDisabled ? undefined : this.handleMouseEnter}
        onMouseLeave={this.props.isDisabled ? undefined : this.onMouseOut}>
          <Text
          className="selectStyle"
          style={this.props.isDisabled ? [styles.selectStyle,styles.disabledSelectStyle] : styles.selectStyle}>
            <Text>
              {this.props.selectData[this.state.selectedItem]}
            </Text>
            <Text>
              {dynamicSVG}
            </Text>
          </Text>
        </Text>
        <Text style={[styles.dropDownStyle, {display: this.state.isOpen ? 'flex' : 'none', maxHeight: 36 * this.props.itemsVisible}]}>
          <View style = {styles.listContainerStyles} >
            <ScrollView style = {styles.listStyle} >
              {this.renderItems(this.props.selectData)}
            </ScrollView>
          </View>
        </Text>
      </Text>
    );
  }
}

export default Select;
