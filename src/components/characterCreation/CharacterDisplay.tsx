import React from 'react';
import CharacterCreator from './CharacterCreator';

export default class CharacterDisplay extends React.Component {
  render(){
    return(
      <div>
        <h2>Character Display</h2>
        <CharacterCreator/>
      </div>
    )
  }
}