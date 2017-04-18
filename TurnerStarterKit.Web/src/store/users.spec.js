import reducer from './users';

const {getUsers, getUser, addUser, editUser} = reducer.actionCreators;
const {mappedKeys, getById} = reducer.selectors;

describe('users reducer', () => {
  it(getUsers.requested, () => {
    const initialState = {};
    const expectedState = {
      loading: true,
    };
    const nextState = reducer(initialState, {
      type: getUsers.requested,
    });
    expect(expectedState).toEqual(nextState);
  });
});

describe('users selectors', () => {
  it('mappedKeys', () => {
    const state = {
      keys: [1, 2, 3],
      entities: {
        1: {a: '1'},
        2: {a: '2'},
        3: {a: '3'},
      },
    };
    const selectedValue = mappedKeys(state);
    const expectedValue = [{a: '1'}, {a: '2'}, {a: '3'}];
    expect(expectedValue).toEqual(selectedValue);
  });
});
