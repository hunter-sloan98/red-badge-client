import { OmitProps } from 'antd/lib/transfer/ListBody';
import React from 'react';
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
    fetch(`http://localhost:3005/character/all`, {
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

  updateOn = () => {
  this.setState({updateActive: true})
  }

  updateOff = () => {
    this.setState({updateActive: false})
  }

  characterMapper = () => {
    return this.state.characters.map((characters, id) => {
      return (
        <div key={id} style={{"display":"flex"}}>
          <Row >
          <Col sm="6">
            <Card body className="characterCard">
              <CardTitle tag="h3">{characters.name}</CardTitle>
              <CardText>Village: {characters.village}</CardText>
              <CardText>Gender: {characters.gender}</CardText>
              <CardText>Jutsus: {characters.jutsu}</CardText>
              <CardText>Affiliation: {characters.affiliation}</CardText>
              <CardText>Bio: {characters.bio}</CardText>
              <CardText>Created by: {characters.creator}</CardText>
              <Button onClick={() => { this.updateOn();}}
                updateOn={this.updateOn}
                token={this.props.token}>Edit</Button>
            <Button className="reviewButton" color="warning" onClick={this.deleteCharacter}>Delete</Button>
            </Card>
          </Col>
          </Row>
        </div>
      );
    });
  };

  deleteCharacter = () => {
    fetch(`http://localhost:3005/character/delete/${this.state.characters[0].id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    console.log(this.state.characters[0].id)
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

        {this.state.updateActive ? ( <CharacterEdit updateOff={this.updateOff} token={this.props.token}/> ) : (<></>)}
        </div>
      
    )
  }
}