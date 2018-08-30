# assign-reducers

Combine [Redux](https://redux.js.org) reducer functions much like [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

[![NPM](https://nodei.co/npm/assign-reducers.png?downloads=true)](https://nodei.co/npm/assign-reducers/)

[![Build Status](https://travis-ci.org/haensl/assign-reducers.svg?branch=master)](https://travis-ci.org/haensl/assign-reducers)

## Installation

Via npm

```
npm i --save assign-reducers
```

Via yarn

```
yarn add assign-reducers
```

## Example

```javascript
import assignReducers from 'assign-reducers';
import anotherReducer from 'somewhere/else/in/my/project/reducer';

const initialState = {
  value: 1
};

const reducer = (state = initialState, action) {
  switch (action.type) {
    case actions.ADD:
      return {
        ...state,
        value: state.value + 1
      };
    default:
      return state;
  }
};

export default assignReducers(reducer, {
  foo: anotherReducer
});

// Resulting state:
// {
//    value: 1,
//    foo: initial state returned by anotherReducer
// }

```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)

MIT
