// @flow

import React, { Component } from 'react';
import Helmet from 'components/Helmet';

import './styles.scss';

class FourOneFourPage extends Component<{}> {
  render() {
    return (
      <div className="notFound">
        <Helmet title="Page Not Found - PurePoint." />
        <div className="row column text-center">
          <div className="notFound__titleWrapper">
            <h1 className="notFound__title">404</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default FourOneFourPage;
