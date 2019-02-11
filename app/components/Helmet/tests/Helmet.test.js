import React from 'react';
import { shallow } from 'enzyme';
import ReactHelmet from 'react-helmet';

import Helmet from 'components/Helmet';
import MetaJson from 'containers/MetaJson';

describe('<Helmet />', () => {
  it('should pass title to MetaJson and react-helmet', () => {
    const renderedComponent = shallow(<Helmet title="Hey" />);
    expect(renderedComponent.find(MetaJson).prop('data').name).toEqual('Hey');
    expect(renderedComponent.find(ReactHelmet).prop('title')).toEqual('Hey');
  });

  it('should pass meta to react-helmet', () => {
    const renderedComponent = shallow(<Helmet meta={[{ hey: 'ho' }]} />);
    expect(renderedComponent.find(ReactHelmet).prop('meta')).toEqual([
      { hey: 'ho' },
    ]);
  });

  it('should render its children', () => {
    const renderedComponent = shallow(<Helmet>Hey</Helmet>);
    expect(renderedComponent.contains('Hey')).toEqual(true);
  });
});
