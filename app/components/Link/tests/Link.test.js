import React from 'react';
import { shallow, render } from 'enzyme';
import CustomLink from 'components/Link';
import { Link } from 'react-router-dom';

describe('<Link />', () => {
  it('should render <Link> if `to` prop is internal', () => {
    const renderedComponent = shallow(<CustomLink to="/hey" />);
    expect(renderedComponent.find(Link).length).toEqual(1);
  });

  it('should render <a> if `to` prop is external', () => {
    const renderedComponent = shallow(<CustomLink to="http://example.com" />);
    expect(renderedComponent.find('a').length).toEqual(1);
  });

  it('should apply given className', () => {
    const renderedComponent = shallow(<CustomLink className="hey" />);
    expect(renderedComponent.hasClass('hey')).toEqual(true);
  });

  it('should apply given activeClassName when `to` is internal', () => {
    const renderedComponent = shallow(
      <CustomLink activeClassName="hey" to="/hey" />
    );
    expect(renderedComponent.prop('activeClassName')).toEqual('hey');
  });

  it("shouldn't apply given activeClassName when `to` is external", () => {
    const renderedComponent = shallow(
      <CustomLink activeClassName="hey" to="http://example.com" />
    );
    expect(renderedComponent.prop('activeClassName')).toEqual(undefined);
  });

  it('should render its children', () => {
    const renderedComponent = render(<CustomLink>hey ho</CustomLink>);
    expect(renderedComponent.find('a').text()).toEqual('hey ho');
  });

  it('should apply custom props', () => {
    const renderedComponent = shallow(<CustomLink hey="ho" />);
    expect(renderedComponent.prop('hey')).toEqual('ho');
  });
});
