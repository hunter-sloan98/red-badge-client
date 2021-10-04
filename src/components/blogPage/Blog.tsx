import React from 'react';
import BlogDisplay from './BlogDisplay'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type StateType = {
  title: string,
  date: string,
  episode: string,
  rating: string,
  post: string,
  recommend: string
}

type PropsType = {
  token: string | null
}

export default class Blog extends React.Component<PropsType, StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      title: '',
      date: '',
      episode: '',
      rating: '',
      post: '',
      recommend: ''
    }
  }
  //TODO: Works needs some fine tuning on the date, rating, and episode numbers due to the models being intergers
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`http://localhost:3005/blog/create`, {
      method: 'POST',
      body: JSON.stringify({
        blog: {
          title: this.state.title,
          date: this.state.date,
          episode: this.state.episode,
          rating: this.state.rating,
          post: this.state.post,
          recommend: this.state.recommend
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err)
    })
    window.location.reload()
  }
  render(){
    return(
      <div>
      <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
      onSubmit={this.handleSubmit}
    >

      <TextField
      id="outlined-required"
      label="Title"
      value={this.state.title}
      onChange={(e) => this.setState({title: e.target.value})}
    />
<br/>
      <TextField   
      id="outlined-required"
      label="Date"
      value={this.state.date}
          onChange={(e) => this.setState({date: e.target.value})}
    />

      <TextField
      id="outlined-required"
      label="Episode Number"
      value={this.state.episode}
          onChange={(e) => this.setState({episode: e.target.value})}
    />
<br/>
      <TextField
      id="outlined-required"
      label="Rating"
      value={this.state.rating}
          onChange={(e) => this.setState({rating: e.target.value})}
    />

      <TextField
      multiline
      maxRows={4}
      id="outlined-required"
      label="Post"
      value={this.state.post}
          onChange={(e) => this.setState({post: e.target.value})}
    />
<br/>
      <TextField
      id="outlined-required"
      label="Recommend"
      value={this.state.recommend}
          onChange={(e) => this.setState({recommend: e.target.value})}
    />
<br/>
      <Button variant="contained" type='submit'>Submit</Button>



</Box>
<br/>
<BlogDisplay token={this.props.token} />
  </div>
    )
  }
}