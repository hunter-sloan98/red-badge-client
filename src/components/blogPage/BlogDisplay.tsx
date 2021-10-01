import React from 'react';
import Blog from './Blog'

export default class BlogDisplay extends React.Component {
  render(){
    return(
      <div>
        <h1>Blog Display Component</h1>
        <Blog />
      </div>
    )
  }
}