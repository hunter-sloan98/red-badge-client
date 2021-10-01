// import { render } from '@testing-library/react';
import React from 'react';
import Navbar from '../navbar/Navbar'
import Signup from './Signup';
import Login from './Login'
import NavbarComponent from '../navbar/NavComponent';

type PropsType = {
  updateToken: any
}


class Auth extends React.Component<PropsType, {}> {
  constructor(props: PropsType){
    super(props)
    this.state ={

    }
  }
  render(){
    return(
      <div className='authPage'>
        <h1> Auth Page </h1>
        {/* <NavbarComponent /> */}
        <Signup updateToken={this.props.updateToken}/>
        <Login updateToken={this.props.updateToken}/>
      </div>
    )
  }
}

  
  export default Auth;