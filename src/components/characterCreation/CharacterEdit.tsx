import React from 'react';
import APIURL from '../../helpers/enviroment';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

type StateType = {
  name: string  
  village: string
  gender: string
  jutsu: string
  affiliation: string
  bio: string
}

type PropsType = {
  token: string | null
  updateOff: () => void
  updateCharacter: any
}

export default class CharacterEdit extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      name: '',
      village: '',
      gender: '',
      jutsu: '',
      affiliation: '',
      bio: '',
    }
  }

  handleSubmit = () => {
    console.log(this.props.updateCharacter.id)
    fetch(`${APIURL}/character/update/${this.props.updateCharacter.id}`, {
      method: 'PUT',
      body: JSON.stringify({ character: {
        name: this.state.name,
        village: this.state.village,
        gender: this.state.gender,
        jutsu: this.state.jutsu,
        affiliation: this.state.affiliation,
        bio: this.state.bio
      }}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    .then((res) => {
      this.props.updateOff()
    })
  }


  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Update Character</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor='name'>Edit Name</Label>
              <Input onChange={(e) => this.setState({name: e.target.value})} name='name' value={this.state.name}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='birthyear'>Edit Village</Label>
              <Input onChange={(e) => this.setState({village: e.target.value})} name='village' value={this.state.village}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='email'>Edit Gender</Label>
              <Input onChange={(e) => this.setState({gender: e.target.value})} name='gender' value={this.state.gender}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='jutsu'>Edit Jutsu</Label>
              <Input onChange={(e) => this.setState({jutsu: e.target.value})} name='jutsu' value={this.state.jutsu}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='affiliation'>Edit Affiliations</Label>
              <Input onChange={(e) => this.setState({affiliation: e.target.value})} name='affiliation' value={this.state.affiliation}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='bio'>Edit Bio</Label>
              <Input onChange={(e) => this.setState({bio: e.target.value})} name='bio' value={this.state.bio} />
            </FormGroup>
            <Button type='submit' >Update Character</Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}