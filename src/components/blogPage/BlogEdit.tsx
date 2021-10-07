import React from 'react';
import APIURL from '../../helpers/enviroment';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

type StateType = {
    title: string,
    episode: string,
    rating: string,
    post: string,
    recommend: string,
}

type PropsType = {
  token: string | null
  updateOff: () => void
  updateBlog: any
}

export default class BlogEdit extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
    title: '',
    episode: '',
    rating: '',
    post: '',
    recommend: '',
    }
  }

  handleSubmit = () => {
    console.log(this.props.updateBlog.id)
    fetch(`${APIURL}/blog/update/${this.props}`, {
      method: 'PUT',
      body: JSON.stringify({ character: {
        title: this.state.title,
        episode: this.state.episode,
        rating: this.state.rating,
        post: this.state.post,
        recommend: this.state.recommend,
      }}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token!
      })
    })
    .then((res) => {
      this.props.updateOff()
    })
  }


  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Update Blog</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor='title'>Edit Title</Label>
              <Input onChange={(e) => this.setState({title: e.target.value})} name='title' value={this.state.title}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='episode'>Edit Episode #</Label>
              <Input onChange={(e) => this.setState({episode: e.target.value})} name='episode' value={this.state.episode}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='rating'>Edit Rating</Label>
              <Input onChange={(e) => this.setState({rating: e.target.value})} name='rating' value={this.state.rating}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='post'>Edit Post</Label>
              <Input onChange={(e) => this.setState({post: e.target.value})} name='post' value={this.state.post}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='recommend'>Edit Recommendation</Label>
              <Input onChange={(e) => this.setState({recommend: e.target.value})} name='recommend' value={this.state.recommend}/>
            </FormGroup>
            <Button type='submit' >Update Character</Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}