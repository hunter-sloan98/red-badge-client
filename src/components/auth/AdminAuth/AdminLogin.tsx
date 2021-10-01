import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

type StateType = {
  username: string,
  password: string
}

type PropsType = {

}

class AdminLogin extends React.Component<{},StateType> {
  constructor(props: string){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`http://localhost:3005/user/loginAdmin`, {
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
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h2> Login Page </h2>
        <h3 className="signupMain">Login</h3>
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

export default AdminLogin;