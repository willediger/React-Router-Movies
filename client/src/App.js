import React, { Component } from 'react';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

import { Route } from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: []
    };
  }

  isSavedText = movie => {
    const saved = this.state.savedList.map(e => e.title).includes(movie.title)
    if (saved) {
      return 'Unsave'
    } else {
      return 'Save'
    }
  }

  toggleSavedList = movie => {
    this.setState(prevState => {
      let savedList = prevState.savedList;
      const titles = savedList.map(e => e.title)
      if (titles.includes(movie.title)) {
        savedList = savedList.filter(e => e.title !== movie.title)
      } else {
        savedList.push(movie);
      }
      return {savedList: savedList}
    })
  }

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        {/* <Route path="/" component={Navigation} /> */}
        <Route path="/" exact component={MovieList } />
        <Route 
          path="/movies/:id"
          exact 
          render={(props) => <Movie {...props} toggleSavedList={this.toggleSavedList} isSavedText={this.isSavedText} />}
         />
        {/* <Route path="/contact" exact component={Contact} /> */}
      </div>
    );
  }
}
