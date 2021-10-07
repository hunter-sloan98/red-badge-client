import React from 'react';
import APIURL from '../../helpers/enviroment';
import Blog from './Blog'
import { Row, Col, Button, Card, CardTitle, CardText, Container } from "reactstrap";
import BlogEdit from './BlogEdit';

type StateType = {
  blogs: Array<{
    id: string,
    title: string,
    date: string,
    episode: string,
    rating: string,
    post: string,
    recommend: string,
    creator: string
  }>,

  updateActive: boolean
  updateBlog: string
}

type PropsType = {
  token: string | null
}

export default class BlogDisplay extends React.Component<PropsType, StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      blogs: [],
      updateActive: false,
      updateBlog: '',
      // title: '',
      // date: '',
      // episode: '',
      // rating: '',
      // post: '',
      // recommend: ''
    }
  }

  componentDidMount = () => {
    fetch(`${APIURL}/blog/all`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({blogs: data})
      console.log(this.state.blogs)
    })
    .catch(err => {
      console.log(err)
    })
  }

  editBlog = (post: any) => {
    this.setState({updateBlog: post})
  }

  updateOn = () => {
  this.setState({updateActive: true})
  }

  updateOff = () => {
    this.setState({updateActive: false})
  }


  
  blogMapper = () => {
    return this.state.blogs.map((blogs, index) => {
      return (
        <div key={index} style={{"display":"flex"}}>
          <Row >
          <Col sm="6">
            <Card body className="characterCard">
              <CardTitle tag="h3">{blogs.title}</CardTitle>
              <CardText>Date: {blogs.date}</CardText>
              <CardText>Episode Number: {blogs.episode}</CardText>
              <CardText>Rating: {blogs.rating}</CardText>
              <CardText>Post: {blogs.post}</CardText>
              <CardText>Recommend: {blogs.recommend}</CardText>
              <CardText>Created by: {blogs.creator}</CardText>
              <Button onClick={() => {this.updateOn(); this.editBlog(blogs)}} updateOn={this.updateOn} token={this.props.token}>Edit</Button>  
               
            {/* reviews={reviews}
            editUpdateRev={editUpdateRev}
            updateOn={updateOn}
            fetchAll={fetchAll}
            token={props.token}
            className="reviewButton"
            color="warning">Edit*/} 
            <Button className="reviewButton" color="warning" onClick={() => {this.deleteBlog(blogs)}}>Delete</Button>
            </Card>
          </Col>
          </Row>
        </div>
      );
    });
  };


  deleteBlog = (blogs: any) => {
    console.log(blogs.id)
    fetch(`${APIURL}/blog/delete/${blogs.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    if(window.confirm('Blog will be deleted forever, please confirm')) {
      console.log('Blog Deleted')
    }
    window.location.reload()
  }
  render(){
    return(
      <div>
        <h1>Blog Display Component</h1>
        {this.state.blogs.length > 0 ? this.blogMapper() : <p className="noCharacters">You have not made any posts yet.</p>}

        {this.state.updateActive ? ( <BlogEdit updateBlog={this.state.updateBlog} updateOff={this.updateOff} token={this.props.token}/> ) : (<></>)}
      </div>
    )
  }
}