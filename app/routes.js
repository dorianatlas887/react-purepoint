// @flow

import React, { PureComponent } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Route } from 'components/Routes';
import Home from 'pages/Home';
import Page404 from 'pages/404';

class Routes extends PureComponent<{}> {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route path="/404" render={props => <Page404 {...props} />} />
        <Redirect to="/404" /* Must be the last one */ />
      </Switch>
    );
  }
}

export default withRouter(Routes);
