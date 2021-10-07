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
    bio: string,
  }>,
  
}

export default class AdminUsers extends React.Component<PropsType, StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      users: [],
      
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

  

  // userMapper = () => {
  //   {this.state.users.map((userInfo, index) => (
              
  //     <tr key={index}>
  //       <td>{userInfo.id}</td>
  //       <td>{userInfo.role}</td>
  //       <td>{userInfo.username}</td>
  //       <td>{userInfo.name}</td>
  //       <td>{userInfo.birthyear}</td>
  //       <td>{userInfo.email}</td>
  //       <td>{userInfo.bio}</td>
  //       <td><button onClick={() => {this.deleteUser(userInfo)}}>Delete</button></td>
  //       </tr>
  //   ))}
  // }

  

  
  

  
  render(){
    return(
      <div>
        {/* {this.state.users.length > 0 ? this.userMapper() : <p className="noReviews">You have not posted any reviews yet.</p>}  */}
        <Table striped bordered className="table" style={{ 'alignItems': 'center'}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Access Level</th>
          <th>Username</th>
          <th>Name</th>
          <th>Birthyear</th>
          <th>Email</th>
          <th>Bio</th>
        </tr> 
      </thead>
      <tbody>
      {this.state.users.map((userInfo, index) => (
              
              <tr key={index}>
                <td>{userInfo.id}</td>
                <td>{userInfo.role}</td>
                <td>{userInfo.username}</td>
                <td>{userInfo.name}</td>
                <td>{userInfo.birthyear}</td>
                <td>{userInfo.email}</td>
                <td>{userInfo.bio}</td>
                <td><button onClick={() => {this.deleteUser(userInfo)}}>Delete</button></td>
                </tr>
            ))}
      </tbody>
      </Table>
      </div>
    )
  }
  deleteUser = (userInfo: any) => {
    fetch(`http://localhost:3005/user/adminuser/delete/${userInfo.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    if(window.confirm('Profile will be permantly deleted, please confirm')) {
      console.log('user deleted')
      window.location.reload()
    }
  }
}
