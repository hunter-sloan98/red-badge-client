import React from 'react';
import APIURL from '../../../helpers/enviroment';
import { Table } from "reactstrap";

type PropsType = {
  token: string | null
}

type StateType = {
  characters: Array<{
    id: string,
    name: string,
    gender: string,
    village: string,
    jutsu: string,
    affiliation: string,
    bio: string,
  }>,
  
}

export default class AdminCharacters extends React.Component<PropsType, StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      characters: [],
      
    }
  }

  componentDidMount = () => {
    fetch(`${APIURL}/character/all`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({characters: data})
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
          <th>Name</th>
          <th>Gender</th>
          <th>Village</th>
          <th>Jutsu</th>
          <th>Affiliations</th>
          <th>Bio</th>
        </tr> 
      </thead>
      <tbody>
      {this.state.characters.map((characterInfo, index) => (
              
              <tr key={index}>
                {/* <td>{characterInfo.id}</td> */}
                <td>{characterInfo.name}</td>
                <td>{characterInfo.gender}</td>
                <td>{characterInfo.village}</td>
                <td>{characterInfo.jutsu}</td>
                <td>{characterInfo.affiliation}</td>
                <td>{characterInfo.bio}</td>
                <td><button onClick={() => {this.deleteUser(characterInfo)}}>Delete</button></td>
                </tr>
            ))}
      </tbody>
      </Table>
      </div>
    )
  }
  deleteUser = (characterInfo: any) => {
    fetch(`${APIURL}/user/adminuser/delete/${characterInfo.id}`, {
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