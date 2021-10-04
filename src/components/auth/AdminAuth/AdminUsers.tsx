import React from 'react';
import { Table } from "reactstrap";

type PropsType = {
  token: string | null
}

type StateType = {
  users: Array<{
    id: string,
    role: string,
    username: string,
    password: string,
    name: string,
    birthyear: string,
    email: string,
    bio: string
  }>
}

export default class AdminUsers extends React.Component<PropsType, StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    fetch(`http://localhost:3005/user/all`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({users: data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  deleteUser = () => {
    fetch(`http://localhost:3005/user/adminuser/delete/:paramID`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        // 'Authorization': this.props.token!
      })
    })
    if(window.confirm('Profile will be permantly deleted, please confirm')) {
      console.log('user deleted')
      window.location.reload()
    }
  }
  

  
  render(){
    return(
      <div>
        <h1>Admin Users</h1>
        <Table striped bordered className="table" style={{'display': 'flec', 'alignItems': 'center'}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Access Level</th>
          <th>Username</th>
          {/* <th>Password</th> */}
          <th>Name</th>
          <th>Birthyear</th>
          <th>Email</th>
          <th>Bio</th>
          
        </tr>
        
      </thead>
      <br/>
      <tbody>
            {this.state.users.map((userInfo) => (
              
              <tr>
                <td>{userInfo.id}</td>
                <td>{userInfo.role}</td>
                <td>{userInfo.username}</td>
                {/* <td>{userInfo.password}</td> */}
                <td>{userInfo.name}</td>
                <td>{userInfo.birthyear}</td>
                <td>{userInfo.email}</td>
                <td>{userInfo.bio}</td>
                <td><button onClick={this.deleteUser}>Delete</button></td>
                </tr>
            
            ))}
      </tbody>
    </Table>
      </div>
    )
  }
}