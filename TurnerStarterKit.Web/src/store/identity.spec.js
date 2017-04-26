import reducer from './identity';

const {login} = reducer.actionCreators;

describe('Store: identity', () => {
  describe('reducer', () => {
    it(login.requested, () => {
      const initialState = {};
      const expectedState = {
        loading: true,
      };
      const nextState = reducer(initialState, {
        type: login.requested,
      });
      expect(expectedState).toEqual(nextState);
    });

    it(login.resolved, () => {
      const initialState = {};
      const expectedState = {
        loading: false,
        user: {name: 'justin'},
        claims: ['dashboard/view', 'users/modify'],
      };
      const nextState = reducer(initialState, {
        type: login.resolved,
        payload: {
          name: 'justin',
          claims: ['dashboard/view', 'users/modify'],
        },
      });
      expect(expectedState).toEqual(nextState);
    });

    it(login.rejected, () => {
      const initialState = {};
      const expectedState = {
        loading: false,
        error: {message: 'some reason'},
      };
      const nextState = reducer(initialState, {
        type: login.rejected,
        error: {
          message: 'some reason',
        },
      });
      expect(expectedState).toEqual(nextState);
    });
  });
});
