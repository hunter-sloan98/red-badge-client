import React from 'react';
import APIURL from '../../helpers/enviroment';
import { Form, FormGroup, Input, Button } from 'reactstrap';

type PropsType = {
  updateToken: any  //!TEMPORARY: Cannot find the right type that works so this is a bandaid for now
}

type StateType = {
  username: string,
  password: string,
  name: string,
  email: string,
  birthyear: string,
  bio: string,
}

class Signup extends React.Component<PropsType,StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      username: '',
      password: '',
      name: '',
      email: '',
      birthyear: '',
      bio:''
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${APIURL}/user/signup`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          email: this.state.email,
          birthyear: this.state.birthyear,
          bio: this.state.bio
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
        <h2>Signup</h2>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Input onChange={(e) => this.setState({username: e.target.value})} name='username' value={this.state.username}   placeholder='Username*' required/>
        </FormGroup>
        <br/>
        <FormGroup>
          <Input  onChange={(e) => this.setState({password: e.target.value})} type='password' name='password' value={this.state.password}  placeholder="Password*" required/>
        </FormGroup>
        <br/>
        <FormGroup>
          <Input  onChange={(e) => this.setState({name: e.target.value})} name='name' value={this.state.name}  placeholder="Name" />
        </FormGroup>
        <br/>
        <FormGroup>
          <Input  onChange={(e) => this.setState({email: e.target.value})} name='email' value={this.state.email}  placeholder="Email" type='email' pattern='.+@email\.com' />
        </FormGroup>
        <br/>
        <FormGroup>
          <Input  onChange={(e) => this.setState({birthyear: e.target.value})} name='birthyear' value={this.state.birthyear}  placeholder="Birthyear" />
        </FormGroup>
        <br/>
        <FormGroup>
          <Input  onChange={(e) => this.setState({bio: e.target.value})} name='bio' value={this.state.bio}  placeholder="Bio" />
        </FormGroup>
        <br/>
        <button type='submit'>Signup</button>
      </Form>
      </div>
    )
  }
}

export default Signup;