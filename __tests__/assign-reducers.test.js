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
      expect(assignReducers.bind(null, (state, action) => state, null)).toThrow();
    });

    it('throws', () => {
      expect(assignReducers.bind(null, (state, action) => state, 2)).toThrow();
    });
  });

  describe('called with a reducer and an empty object', () => {
    it('returns a function', () => {
      expect(typeof assignReducers.bind(null, (state, action) => state, {})).toEqual('function');
    });

    it('returns a reducer', () => {
      const reducer = assignReducers((state, action) => state, {});
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
      const reducer = (state, action) => state;
      const reducers = {
        test: (state, action) => ({
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
});
