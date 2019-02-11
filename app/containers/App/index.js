// @flow

import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import injectSagas from 'utils/injectSagas';

import Header from 'components/Header';
import Routes from 'routes';

import saga, { reducer } from 'containers/App/sagas';

class App extends Component<Props> {
  render() {
    return (
      <div>
        <Header />
        <Routes />
      </div>
    );
  }
}

export default compose(withRouter, injectSagas({ key: 'app', saga, reducer }))(
  App
);
