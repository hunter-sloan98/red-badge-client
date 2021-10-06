import React from 'react';
import MyProfleEdit from './MyProfileEdit';

interface profileModel {
    bio: string
    birthyear: string
    email: string
    id: string
    name: string
    role: string
    username: string
}

type PropsType = {
  token: string | null,
  logout: () => void,
  // updateOn: () => void,
  // updateOff: () => void
}

type StateType = {
    profile: profileModel
  //   bio: string
  //   birthyear: string
  //   email: string
  //   id: string
  //   name: string
  //   role: string
  //   username: string
  // // }>,
  updateActive: boolean
}

export default class MyProfile extends React.Component<PropsType, StateType>{
  constructor(props: any){
    super(props)
    this.state = {
        profile: {
          bio: '',
          birthyear: '',
          email: '',
          id: '',
          name: '',
          role: '',
          username: ''
        },
      updateActive: false
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
      this.setState({profile: data})
      console.log(this.state.profile)
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
  }

  updateOn = () => {
    this.setState({updateActive: true})
  }

  updateOff = () => {
    this.setState({updateActive: false})
  }

  // editProfile = () => {
  //   fetch(`http://localhost:3005/user/myprofile/update/:paramID`, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       name: this.state.name,
  //       birthyear: this.state.birthyear,
  //       email: this.state.email,
  //       bio: this.state.bio
  //     }),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.props.token!
  //     })
  //   })
  // }
  render(){
    return(
      <div>
        <h1>My Profile</h1>
        <p>Access Level:  </p>
        <p>Name: {this.state.profile.name} </p>
        <p>Birthyear: {this.state.profile.birthyear} </p>
        <p>Email:  {this.state.profile.email}</p>
        <p>Bio: {this.state.profile.bio} </p>
        <br/>
        <button onClick={this.deleteProfile}>Delete Profile</button>
        <button onClick={this.updateOn}>Edit Profile</button>
        {this.state.updateActive ? <MyProfleEdit token={this.props.token} profileID={this.state.profile.id} updateOn={this.updateOn} updateOff={this.updateOff}/> : <></>}
      </div>
    )
  }
}