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

if (typeof exports === 'object' && typeof module !== 'undefined') {
  module.exports = assignReducers;
} else if (typeof define === 'function' && define.amd) {
  define(['exports'], (exports) => exports.assignReducers = assignReducers);
} else if (!global.assignReducers) {
  global.assignReducers = assignReducers;
}

