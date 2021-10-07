// import { render } from '@testing-library/react';
import React from 'react';
import Navbar from '../navbar/Navbar'
import Signup from './Signup';
import Login from './Login'
import NavbarComponent from '../navbar/NavComponent';

type PropsType = {
  updateToken:  (newToken: string) => void
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
        <Signup updateToken={this.props.updateToken}/>
        <br/>
        <Login updateToken={this.props.updateToken}/>
      </div>
    )
  }
}

  
  export default Auth;