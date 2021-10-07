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
  token: string | null
  updateOn: () => void
  updateOff: () => void
  profileID: string
}

export default class MyProfleEdit extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      name: '',
      birthyear: '',
      email: '',
      bio: '',
    }
  }

  handleSubmit = () => {
    
    fetch(`http://localhost:3005/user/myprofile/update/${this.props.profileID}`, {
      method: 'PUT',
      body: JSON.stringify({user: {
        name: this.state.name,
        birthyear: this.state.birthyear,
        email: this.state.email,
        bio: this.state.bio
      }}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
  }


  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor='name'>Edit Name</Label>
              <Input onChange={(e) => this.setState({name: e.target.value})} name='name' value={this.state.name}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='birthyear'>Edit Birthyear</Label>
              <Input onChange={(e) => this.setState({birthyear: e.target.value})} name='birthyear' value={this.state.birthyear}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='email'>Edit Email</Label>
              <Input onChange={(e) => this.setState({email: e.target.value})} name='email' value={this.state.email}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='bio'>Edit Bio</Label>
              <Input onChange={(e) => this.setState({bio: e.target.value})} name='bio' value={this.state.bio}/>
            </FormGroup>
            <Button type='submit'>Update Profile</Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}