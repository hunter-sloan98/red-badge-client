import React from 'react';
import APIURL from '../../helpers/enviroment';
import CharacterDisplay from './CharacterDisplay';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type StateType = {
      name: string,
      village: string,
      gender: string,
      jutsu: string,
      affiliation: string,
      bio: string
}

type PropsType = {
  token: string | null
}

export default class CharacterCreator extends React.Component<PropsType, StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      name: '',
      village:'',
      gender:'',
      jutsu:'',
      affiliation:'',
      bio:''
    }
  } 

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${APIURL}/character/create`, {
      method: 'POST',
      body: JSON.stringify({
        character: {
          name: this.state.name,
          village: this.state.village,
          gender: this.state.gender,
          jutsu: this.state.jutsu,
          affiliation: this.state.affiliation,
          bio: this.state.bio
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){ //TODO: Seems to be working, but not until I can get the token, validate session is blocking it to the servers
    return(
      <div>
        <h1> Character Creator</h1>
      <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >

      <TextField
          id="outlined-required"
          label="Name"
          value={this.state.name}
          onChange={(e) => this.setState({name: e.target.value})}
        />
<br/>
      <TextField  //? Might be a dropdown select menu 
          id="outlined-required"
          label="Village"
          value={this.state.village}
          onChange={(e) => this.setState({village: e.target.value})}
        />

      <TextField
          id="outlined-required"
          label="Gender"
          value={this.state.gender}
          onChange={(e) => this.setState({gender: e.target.value})}
        />
<br/>
      <TextField
          id="outlined-required"
          label="Jutsu"
          value={this.state.jutsu}
          onChange={(e) => this.setState({jutsu: e.target.value})}
        />

      <TextField
          id="outlined-required"
          label="Affiliation"
          value={this.state.affiliation}
          onChange={(e) => this.setState({affiliation: e.target.value})}
        />
<br/>
      <TextField
          multiline
          maxRows={4}
          id="outlined-required"
          label="Bio"
          value={this.state.bio}
          onChange={(e) => this.setState({bio: e.target.value})}
        />
<br/>
      <Button variant="contained" type='submit'>Submit</Button>



    </Box>
    <CharacterDisplay token={this.props.token}/>
      </div>
    )
  }
} 

