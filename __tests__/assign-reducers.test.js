import assignReducers from '../';

describe('assignReducers()', () => {
  describe('called without parameters', () => {
    it('throws', () => {
      expect(assignReducers).toThrow();
    });
  });

  describe('called without function as first parameter', () => {
    it('throws', () => {
      expect(assignReducers.bind(null, {})).toThrow();
    });
  });

  describe('called without object as second parameter', () => {
    it('throws', () => {
      expect(assignReducers.bind(null, (state) => state, null)).toThrow();
    });

    it('throws', () => {
      expect(assignReducers.bind(null, (state) => state, 2)).toThrow();
    });
  });

  describe('called with a reducer and an empty object', () => {
    it('returns a function', () => {
      expect(typeof assignReducers.bind(null, (state) => state, {})).toEqual('function');
    });

    it('returns a reducer', () => {
      const reducer = assignReducers((state) => state, {});
      const state = {
        value: 1
      };

      expect(reducer(state, {})).toEqual(state);
    });
  });

  describe('called with a reducer and an object of reducers', () => {
    let reducer;
    let reducers;
    let assignedReducer;

    beforeEach(() => {
      reducer = (state) => state;
      reducers = {
        test: (state) => ({
          ...state,
          foo: 'bar'
        })
      };
      assignedReducer = assignReducers(reducer, reducers);
    });

    it('returns a function', () => {
      expect(typeof assignedReducer).toEqual('function');
    });

    it('returns a reducer', () => {
      const state = {
        value: 1
      };

      expect(assignedReducer(state, {})).toEqual({
        value: 1,
        test: {
          foo: 'bar'
        }
      });
    });
  });

  describe('change detection', () => {
    let reducer;
    let reducers;
    let assignedReducer;
    beforeEach(() => {
      reducer = (state = { value: 1 }, action) => {
        switch (action.type) {
          case 'doStuff':
            return {
              ...state,
              value: state.value + 1
            };
          default:
            return state;
        }
      };
      reducers = {
        test: (state = { foo: 'bar' }, action) => {
          switch (action.type) {
            case 'doChildStuff':
              return {
                ...state,
                foo: 'baz'
              };
            default:
              return state;
          }
        }
      };
      assignedReducer = assignReducers(reducer, reducers);
    });

    describe('when there are no changes in the state', () => {
      let original;
      let next;

      beforeEach(() => {
        original = assignedReducer(undefined, { type: 'INIT' });
        next = assignedReducer(undefined, { type: 'INIT' });
      });

      it('returns the original state', () => {
        expect(original).toEqual(next);
      });
    });

    describe('when there are changes in the root state', () => {
      let original;
      let next;

      beforeEach(() => {
        original = assignedReducer(undefined, { type: 'INIT' });
        next = assignedReducer(original, { type: 'doStuff' });
      });

      it('returns a new state', () => {
        expect(original).not.toEqual(next);
      });
    });

    describe('when there are changes in the child state', () => {
      let original;
      let next;

      beforeEach(() => {
        original = assignedReducer(undefined, { type: 'INIT' });
        next = assignedReducer(original, { type: 'doChildStuff' });
      });

      it('returns a new state', () => {
        expect(original).not.toEqual(next);
      });
    });
  });
});
