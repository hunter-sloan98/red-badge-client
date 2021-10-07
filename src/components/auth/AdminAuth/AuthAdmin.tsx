import React from 'react'
import AdminUsers from './AdminUsers'
import AdminBlogs from './AdminBlogs'
import AdminCharacters from './AdminCharacters'

type PropsType = {
  token: string | null
}

export default class AuthAdmin extends React.Component<PropsType, {}> {
  constructor(props: PropsType){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <h1> Admin Dashboard </h1>
        <h3>Current Users</h3>
        <AdminUsers token={this.props.token}/>
        <h3>Created Characters</h3>
        <AdminCharacters token={this.props.token}/>
        <h3>Blog Feed</h3>
        <AdminBlogs token={this.props.token}/>
      </div>
    )
  }
}