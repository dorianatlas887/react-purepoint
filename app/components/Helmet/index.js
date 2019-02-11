// @flow

import * as React from 'react';
import Helmet from 'react-helmet';

import MetaJson from 'containers/MetaJson';

type Props = {
  title?: string,
  meta?: Array<Object>,
  children?: any,
};
const HelmetComponent = ({ title, meta, children, ...otherProps }: Props) => {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: title,
  };
  return (
    <div>
      <Helmet title={title} meta={meta} {...otherProps}>
        {children}
      </Helmet>
      <MetaJson data={data} />
    </div>
  );
};

export default HelmetComponent;
