// https://github.com/haensl/assign-reducers#readme v1.0.4 Copyright 2018 Hans-Peter Dietz
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global['assign-reducers'] = factory());
}(this, (function () { 'use strict';

const assignReducers = (reducer, reducers = {}) => {
  if (typeof reducer !== 'function') {
    throw new TypeError('Invalid parameter, expected reducer function!');
  }

  if (reducers === null || typeof reducers !== 'object') {
    throw new TypeError('Invalid parameter, expected reducers object!');
  }

  return (state, action) => {
    const rootState = reducer(state, action);
    let hasChanged = rootState !== state;
    const childState = Object.keys(reducers)
      .map((key) => {
        const nextState = reducers[key](rootState[key], action);
        hasChanged = hasChanged || state[key] !== nextState;
        return {
          key,
          nextState
        };
      })
      .reduce((state, reducer) => {
        state[reducer.key] = reducer.nextState;
        return state;
      }, {});

    if (hasChanged) {
      return Object.assign({}, rootState, childState);
    }

    return state;
  };
};

return assignReducers;

})));
