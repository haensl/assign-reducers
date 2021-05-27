import { createStore } from 'redux';
import assignReducers from '@haensl/assign-reducers';

describe('assign-reducers esm package test', () => {
  const reducerA = (state = {}) => state;
  const reducerB = (state = {}) => state;

  let combined;

  it('does not throw', () => {
    expect(() => {
      combined = assignReducers(
        reducerA,
        {
          foo: reducerB
        }
      );
    }).not.toThrow();
  });

  it('creates a valid reducer', () => {
    expect(() => {
      createStore(
        combined,
        {}
      );
    }).not.toThrow();
  });
});
