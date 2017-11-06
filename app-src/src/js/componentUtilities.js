export default class ComponentUtilities{
  /*
    component (this), element(element to hover), stateToToggle({state: !this.state.state}), listenerAction (add or remove),
  */
  static hoverUtility (component, newHoverState, hoverSetState){
    if(newHoverState !== component.state.hoverActive){
      component.setState((prevState)=>{
        return {...prevState, ...hoverSetState};
      });
    }
  }
}
