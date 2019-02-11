// @flow

import React, { Component } from 'react';

import './styles.scss';

type Props = {
  searchRecipe: Function,
};

class SearchBar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }
  componentWillMount() {
    this.typingTimeout = 0;
  }
  onInputChange = (value: string) => {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      this.props.searchRecipe(this.state.query);
    }, 1000);
    this.setState({
      query: value,
    });
    this.typingTimeout = timeoutId;
  };
  typingTimeout: number;
  render() {
    return (
      <div className="searchBar">
        <input
          className="searchBar__inputField"
          onChange={e => this.onInputChange(e.target.value)}
          defaultValue={this.state.query}
          placeholder="Search for..."
        />
        <button className="searchBar__btn">Search</button>
      </div>
    );
  }
}

export default SearchBar;
