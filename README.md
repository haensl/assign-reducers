# assign-reducers

Combine [Redux](https://redux.js.org) reducer functions much like [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

[![NPM](https://nodei.co/npm/assign-reducers.png?downloads=true)](https://nodei.co/npm/@haensl%2Fassign-reducers/)

[![CircleCI](https://circleci.com/gh/haensl/assign-reducers.svg?style=svg)](https://circleci.com/gh/haensl/assign-reducers)

## Installation

Via npm

```
npm i --save @haensl/assign-reducers
```

Via yarn

```
yarn add @haensl/assign-reducers
```

## Usage

ESM

```javascript
import assignReducers from '@haensl/assign-reducers';
import { createStore } from 'redux';

// ...

const rootReducer = assignReducers(someReducer, {
  subTree: someOtherReducer
});
const store = createStore(
  rootReducer,
  initialState
);
```

CommonJS

```javascript
const assignReducers = require('@haensl/assign-reducers');
const { createStore } = require('redux');
// ...

const rootReducer = assignReducers(someReducer, {
  subTree: someOtherReducer
});

const store = createStore(
  rootReducer,
  initialState
);
```

## Example

```javascript
import assignReducers from '@haensl/assign-reducers';
import actions from './actions';
import anotherReducer from 'somewhere/else/in/my/project/reducer';

const initialState = {
  value: 1
};

const reducer = (state = initialState, action) => {
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

export default assignReducers(
  reducer,
  {
    foo: anotherReducer
  }
);

// Resulting state:
// {
//    value: 1,
//    foo: initial state returned by anotherReducer
// }

```

## Synopsis

### `assignReducers(reducer, reducersObject) => reducer`

`assignReducers` combines reducers analogous to [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), i.e. with a shallow merge.

##### Parameters

##### reducer

A regular [Redux](https://redux.js.org) reducer function which forms the base of the state (sub-) tree object.

##### Example

```javascript
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DO_SOMETHING:
      return {
        // changed state
      };
    default:
      return state;
  }
};
```

##### recudersObject

An object mappging keys to [Redux](https://redux.js.org) reducer functions. The keys will me merged shallowly into the state created by `reducer`.

##### Example

```javascript
const reducersObject = {
  foo: reducerB,
  bar: reducerC
};

const newReducer = assignReducers(reducerA, reducersObject);
// state returned by newReducer:
// {
//    foo: state returned by reducerB,
//    bar: state returned by reducerC,
//    state returned by reducerA
// }
```

## FAQ

* Does `assignReducers()` work with [`combineReducers()`](https://redux.js.org/api/combinereducers)?

  Yes, it does. Since all we need are reducer functions you can combine the two in any way you like. You can for example do stuff like
  
  ```javascript
  assignReducers(
    reducerA,
    {
      foo: combineReducers({
        bar: reducerB,
        baz: reducerC
      })
    }
  );`
  ```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)

MIT
