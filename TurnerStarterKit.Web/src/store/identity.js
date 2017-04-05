import {handleActions} from 'redux-actions';
import {thunkCreator} from './util';

const fakeUser = {
  user: {
    firstName: 'Justin',
    lastName: 'Obney',
    username: 'justinobney',
    claims: ['dashboard/view', 'users/modify'],
  },
};

const actionCreators = {
  login: thunkCreator({
    async promise() {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(fakeUser), 1000);
      });
    },
    type: 'LOGIN',
  }),
};

const initialState = {
  user: null,
  loginLoading: false,
};

const reducer = handleActions(
  {
    [actionCreators.login.requested]: (state, action) => ({
      ...state,
      loginLoading: true,
    }),
    [actionCreators.login.resolved]: (state, action) => ({
      ...state,
      ...action.payload,
      loginLoading: false,
    }),
    [actionCreators.login.rejected]: (state, action) => ({
      ...state,
      loginLoading: false,
    }),
  },
  initialState,
);
reducer.actionCreators = actionCreators;

export default reducer;
