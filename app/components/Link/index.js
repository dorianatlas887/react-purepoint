// @flow

import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import cx from 'classnames';

type Props = {
  to?: string,
  children?: any,
  className?: string,
  activeClassName?: string,
  exact?: boolean,
  pathname?: string,
};

const CustomLink = ({
  to,
  className,
  activeClassName,
  children,
  exact = false,
  pathname,
  ...otherProps
}: Props) => {
  const regex = new RegExp('^http', 'i');
  const isExternal = to ? regex.test(to) : false;
  const isNested = to && to.split('/').filter(x => x).length > 1;
  const actualProps: Object = {
    className: cx(
      className,
      isNested && pathname && to && pathname.startsWith(to) && activeClassName
    ),
    to,
    ...otherProps,
  };
  let Component = Link;

  if (isExternal || !to) {
    Component = 'a';
  } else if (activeClassName) {
    Component = NavLink;
  }

  if (isExternal) {
    actualProps.href = to;
  } else {
    actualProps.to = to;
    if (Component === NavLink) {
      actualProps.activeClassName = activeClassName;
      actualProps.exact = exact;
    }
  }
  return React.createElement(Component, actualProps, [children]);
};

export default CustomLink;
