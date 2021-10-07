import React from 'react';
import APIURL from '../../helpers/enviroment';
import { Form, FormGroup, Input, Button } from 'reactstrap';

type StateType = {
  username: string,
  password: string
}

type PropsType = {
  updateToken: (newToken: string) => void //!TEMPORARY: Cannot find the right type that works so this is a bandaid for now
}

class Login extends React.Component<PropsType,StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.updateToken(data.sessionToken)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h2>Login</h2>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Input onChange={(e) => this.setState({username: e.target.value})} name='username' value={this.state.username}   placeholder='Username' required/>
        </FormGroup>
        <br/>
        <FormGroup>
          <Input  onChange={(e) => this.setState({password: e.target.value})} type='password' name='password' value={this.state.password}  placeholder="Password" required/>
        </FormGroup>
        <br/>
        <button type='submit'>Login</button>
      </Form>
      </div>
    )
  }
}

export default Login;