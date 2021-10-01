import React from 'react'; 
import NavbarComponent from './NavComponent';

// type PropsType = {
//   logout: any //!TEMPORARY: Cannot find the right type that works so this is a bandaid for now
//   token: any //!TEMPORARY: Cannot find the right type that works so this is a bandaid for now
// }

export default class Navbar extends React.Component{
  render(){
    return(
      <div>
        <h4>Navbar</h4>
        <NavbarComponent /> {/*logout={this.props.logout} token={this.props.token}*/}
      </div>
    )
  }
}