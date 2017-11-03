export default class ComponentUtilities{
  /*
    component (this), element(element to hover), stateToToggle({state: !this.state.state}), listenerAction (add or remove),
  */
  static hoverUtility (component, element, stateToToggle, listenerAction){
    function setState(){
      console.log('SETSTATE is Fireing');
      return component.setState((prevState)=>{
        return {...prevState, ...stateToToggle};
      });
    }

    // function add(){
    //   return add(element, 'onmouseover', setState), add(element, 'onmouseout', setState);
    // }
    //
    // function remove(){
    //   console.log('REMOVE is Fireing');
    //   return remove(element, 'onmouseover', setState), remove(element, 'onmouseout', setState);
    // }

    console.log(element);
    return listenerAction === 'add' ?
      (
        element.addEventListener('onmouseover', setState),
        element.addEventListener('onmouseout', setState)
      ) :
      (
        element.removeEventListener('onmouseover', setState),
        element.removeEventListener('onmouseout', setState)
      );
  }
}
