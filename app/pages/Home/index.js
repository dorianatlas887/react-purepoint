// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import { history } from 'components/ConnectedRouter';

import Helmet from 'components/Helmet';
import SearchBar from 'components/SearchBar';
import Recipe from 'components/Recipe';
import Preloader from 'components/Preloader';

import { requestRecipe } from 'containers/App/sagas';
type Props = {
  isLoading: boolean,
  error: string,
  recipes: Object,
  requestRecipe: Function,
};
class HomePage extends Component<Props> {
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
      this.props.requestRecipe(this.state.searchValue);
    }, 500);
    this.setState({
      query: value,
    });
    this.typingTimeout = timeoutId;
  };
  typingTimeout: number;
  render() {
    const { recipes, isLoading } = this.props;
    return (
      <div className="homePage">
        <Helmet title="Recipe Finder">
          <meta name="description" content="PurePoint test project" />
        </Helmet>
        <div className="row column">
          <SearchBar searchRecipe={this.props.requestRecipe} />
        </div>
        <div className="row mt-lg">
          {isLoading && <Preloader height={100} />}
          {!isLoading &&
            recipes.entrySeq().map(([index, recipe]) => (
              <div className="column small-12" key={generate()}>
                <Recipe recipe={recipe} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.getIn(['app', 'isLoading']),
  error: state.getIn(['app', 'error']),
  recipes: state.getIn(['app', 'recipes']),
});

const mapDispatchToProps = dispatch => ({
  requestRecipe: query => dispatch(requestRecipe(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
