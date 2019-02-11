// @flow

import React, { Component } from 'react';
import qs from 'query-string';
import { Route } from 'react-router-dom';

type Props = {
  location?: Object,
};

class CustomRoute extends Component<Props> {
  render() {
    const { location, ...otherProps } = this.props;
    const query = location && qs.parse(location.search);
    const locationWithQuery = {
      ...location,
      query,
    };
    return <Route location={locationWithQuery} {...otherProps} />;
  }
}

export default CustomRoute;
