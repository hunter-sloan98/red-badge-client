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
        <h1> Auth Admin </h1>
        <AdminUsers token={this.props.token}/>
        <AdminCharacters />
        <AdminBlogs token={this.props.token}/>
      </div>
    )
  }
}