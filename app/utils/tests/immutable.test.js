import { fromJS } from 'immutable';
import { get, getIn } from '../immutable';

describe('get', () => {
  it('should return undefined if falsy value is provaded', () => {
    expect(get('')).toEqual(undefined);
  });

  it('should return value from path if plain js array or object is provided', () => {
    expect(get({ a: 'hey' }, 'a')).toEqual('hey');
  });

  it('should return value from path if immutable collection is provided', () => {
    expect(get(fromJS({ a: 'hey' }), 'a')).toEqual('hey');
  });

  it('should return default value if no value provided', () => {
    expect(get(null, '', 'hey')).toEqual('hey');
  });
});

describe('getIn', () => {
  it('should return undefined if falsy value is provaded', () => {
    expect(getIn('')).toEqual(undefined);
  });

  it('should return value from path if plain js array or object is provided', () => {
    expect(getIn({ a: { b: 'hey' } }, ['a', 'b'])).toEqual('hey');
  });

  it('should return value from path if immutable collection is provided', () => {
    expect(getIn(fromJS({ a: { b: 'hey' } }), ['a', 'b'])).toEqual('hey');
  });

  it('should return default value if no value provided', () => {
    expect(getIn(null, '', 'hey')).toEqual('hey');
  });
});
