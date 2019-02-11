// @flow

import * as React from 'react';
import Link from 'components/Link';

import './styles.scss';

class Header extends React.Component<Props, {}> {
  render() {
    return (
      <div className="header">
        <div className="header__topLine row align-middle">
          <div className="shrink column">
            <Link className="header__title" to="/">
              <h3>Recipe Finder</h3>
            </Link>
          </div>
          <div className="shrink column">
            <Link className="header__menuItem" to="/">
              <h6>Home</h6>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
