import { title } from 'process';
import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

type StateType = {
  name: string,
  birthyear: string,
  email: string,
  bio: string
}

type PropsType = {
  token: string
}

export default class MyProfleEdit extends React.Component<PropsType, StateType> {
  constructor(props: any) {
    super(props)
    this.state = {
      name: '',
      birthyear: '',
      email: '',
      bio: '',
    }
  }

  handleSubmit = () => {
    fetch(`http://localhost:3005/user/myprofile/update/:paramID`, {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.name,
        birthyear: this.state.birthyear,
        email: this.state.email,
        bio: this.state.bio
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      })
    })
  }


  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}