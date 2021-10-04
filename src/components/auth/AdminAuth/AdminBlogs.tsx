import React from 'react';
import { Row, Col, Button, Card, CardTitle, CardText, Container } from "reactstrap";

type PropsType = {
  token: string | null
}

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
  }>
}

export default class AdminBlogs extends React.Component<PropsType, StateType> {
  constructor(props: PropsType){
    super(props)
    this.state = {
      // title: '',
      // date: '',
      // episode: '',
      // rating: '',
      // post: '',
      // recommend: ''
      blogs: []
    }
  }


  componentDidMount = () => {
    fetch(`http://localhost:3005/blog/all`, {
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
  blogMapper = () => {
    return this.state.blogs.map((blogs, id) => {
      return (
        <div key={id} style={{"display":"flex"}}>
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
              <Button>Edit</Button>  
              {/* onClick={() => {
              // editUpdateRev(review);
              // updateOn();
            }}
            reviews={reviews}
            editUpdateRev={editUpdateRev}
            updateOn={updateOn}
            fetchAll={fetchAll}
            token={props.token}
            className="reviewButton"
            color="warning">Edit*/} 
            <Button className="reviewButton" color="warning" onClick={this.deleteBlog}>Delete</Button>
            </Card>
          </Col>
          </Row>
        </div>
      );
    });
  };

  deleteBlog = () => {
    fetch(`http://localhost:3005/blog/delete/${this.state.blogs[0].id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    console.log(this.state.blogs[0].id)
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
      </div>
    )
  }
}