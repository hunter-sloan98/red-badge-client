import React from 'react';
import APIURL from '../../helpers/enviroment';
// import Card from '@mui/material/Card'
import { Row, Col, Button, Card, CardTitle, CardText, Container } from "reactstrap";
import CharacterCreator from './CharacterCreator';
import CharacterEdit from './CharacterEdit';

type StateType = {
  // id: string,
  // name: string,
  // village: string,
  // gender: string,
  // jutsu: string,
  // affiliation: string,
  // bio: string,
  // creator: string,
  characters: Array<{
    affiliation: string
    bio: string
    creator: string
    gender: string
    id: string
    jutsu: string
    name: string
    village: string
  }>,
  updateActive: boolean
  updateCharacter: string
}

type PropsType = {
  token: string | null
  
}

export default class CharacterDisplay extends React.Component<PropsType,StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      characters: [],
      updateActive: false,
      updateCharacter: ''
      // id:'',
      // name: '',
      // village: '',
      // gender: '',
      // jutsu: '',
      // affiliation: '',
      // bio: '',
      // creator: '',
    }
  }

  componentDidMount = () => {
    fetch(`${APIURL}/character/all`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({characters: data})
      // this.setState({id: data.id})
      // console.log(this.state.id)
      // console.log(this.state.characters)

    })
    .catch(err => {
      console.log(err)
    })
  }

  editCharacter = (char: any) => {
    this.setState({updateCharacter: char})
  }

  updateOn = () => {
  this.setState({updateActive: true})
  }

  updateOff = () => {
    this.setState({updateActive: false})
  }

  characterMapper = () => {
    return this.state.characters.map((character, index) => {
      return (
        <div key={index} style={{"display":"flex"}}>
          <Row >
          <Col sm="6">
            <Card body className="characterCard">
              <CardTitle tag="h3">{character.name}</CardTitle>
              <CardText>Village: {character.village}</CardText>
              <CardText>Gender: {character.gender}</CardText>
              <CardText>Jutsus: {character.jutsu}</CardText>
              <CardText>Affiliation: {character.affiliation}</CardText>
              <CardText>Bio: {character.bio}</CardText>
              <CardText>Created by: {character.creator}</CardText>
              <CardText>ID: {character.id}</CardText>
              <Button onClick={() => { this.updateOn(); this.editCharacter(character)}}
                updateOn={this.updateOn}
                token={this.props.token}>Edit</Button>
            <Button className="reviewButton" color="warning" onClick={() => { this.deleteCharacter(character)}}>Delete</Button>
            </Card>
          </Col>
          </Row>
        </div>
      );
    });
  };

  deleteCharacter = (character: any) => {
    fetch(`${APIURL}/character/delete/${character.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    console.log(character.id)
    if(window.confirm('Character will be permantly deleted, please confirm')) {
      console.log('character deleted')
    }
    window.location.reload()
  }
  render(){
    return(
        <div >
        <h2>Character Display</h2>
        {this.state.characters.length > 0 ? this.characterMapper() : <p className="noCharacters">You have not made any characters yet.</p>}

        {this.state.updateActive ? ( <CharacterEdit updateCharacter={this.state.updateCharacter} updateOff={this.updateOff} token={this.props.token}/> ) : (<></>)}
        </div>
      
    )
  }
}