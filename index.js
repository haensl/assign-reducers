const assignReducers = (reducer, reducers = {}) => {
  if (typeof reducer !== 'function') {
    throw new TypeError('Invalid parameter, expected reducer function!');
  }

  if (reducers === null || typeof reducers !== 'object') {
    throw new TypeError('Invalid parameter, expected reducers object!');
  }

  return (state, action) => {
    const rootState = reducer(state, action);
    const childState = Object.keys(reducers)
      .map((key) => ({
        key,
        value: reducers[key](rootState[key], action)
      }))
      .reduce((state, reducer) => {
        state[reducer.key] = reducer.value;
        return state;
      }, {});

    return Object.assign(rootState, childState);
  };
};

if (typeof exports === 'object' && typeof module !== 'undefined') {
  module.exports = assignReducers;
} else if (typeof define === 'function' && define.amd) {
  define(['exports'], assignReducers);
} else if (!global.assignReducers) {
  global.assignReducers = assignReducers;
}

