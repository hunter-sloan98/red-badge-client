import React from 'react';
// import MyProfleEdit from './MyProfileEdit';

type PropsType = {
  token: string | null,
  logout: () => void
}

type StateType = {
  name: string,
  birthyear: string,
  email: string,
  bio: string,
  role: string

  
}

export default class MyProfile extends React.Component<PropsType, StateType>{
  constructor(props: any){
    super(props)
    this.state = {
    name: '',
    birthyear: '',
    email: '',
    bio: '',
    role: ''
  }
}



  componentDidMount = () => {
    fetch(`http://localhost:3005/user/myprofile/:paramID`, {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      }),
    })
    .then(res => res.json())
    .then(data => {
      this.setState({name: data.name})
      this.setState({birthyear: data.birthyear})
      this.setState({email: data.email})
      this.setState({bio: data.bio})
      this.setState({role: data.role})
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  deleteProfile = () => {
    fetch(`http://localhost:3005/user/myprofile/delete/:paramID`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    if(window.confirm('Profile will be permantly deleted, please confirm')) {
      this.props.logout()
      console.log('user deleted')
    } 

    // window.confirm('Profile will be permantly deleted, please confirm') ? this.props.logout : console.log('No Delete')
    
    // alert('Are you sure!!, you will br brought back to the login screen')
  }

  editProfile = () => {
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
        'Authorization': this.props.token!
      })
    })
  }
  render(){
    return(
      <div>
        <h1>My Profile</h1>
        <p>Access Level: {this.state.role} </p>
        <p>Name: {this.state.name}</p>
        <p>Birthyear: {this.state.birthyear} </p>
        <p>Email: {this.state.email} </p>
        <p>Bio: {this.state.bio} </p>
        <br/>
        <button onClick={this.deleteProfile}>Delete Profile</button>
        <button>Edit Profile</button>
        {/* <MyProfleEdit token={this.props.token} /> */}
      </div>
    )
  }
}