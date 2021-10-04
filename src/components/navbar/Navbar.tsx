import React from 'react'; 
import NavbarComponent from './NavComponent';

type PropsType = {
   logout: () => void //!TEMPORARY: Cannot find the right type that works so this is a bandaid for now
   token: string | null //!TEMPORARY: Cannot find the right type that works so this is a bandaid for now
}

export default class Navbar extends React.Component<PropsType, {}>{
  constructor(props: PropsType){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <h4>Navbar</h4>
        <NavbarComponent  logout={this.props.logout} token={this.props.token} /> 
      </div>
    )
  }
}

/*token={this.props.token}/>*/