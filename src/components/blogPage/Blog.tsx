import React from 'react';
import BlogDisplay from './BlogDisplay'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default class Blog extends React.Component {
  render(){
    return(
      <div>
      <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
    >

      <TextField
      id="outlined-required"
      label="Title"
    />
<br/>
      <TextField  
      id="outlined-required"
      label="Date"
    />

      <TextField
      id="outlined-required"
      label="Episode Number"
    />
<br/>
      <TextField
      id="outlined-required"
      label="Rating"
    />

      <TextField
      multiline
      maxRows={4}
      id="outlined-required"
      label="Post"
    />
<br/>
      <TextField
      id="outlined-required"
      label="Reccomend"
    />



</Box>
  </div>
    )
  }
}