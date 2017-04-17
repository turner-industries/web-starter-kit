import {handleActions} from 'redux-actions';
import {thunkCreator} from './util';
import api from './api';

const actionCreators = {
  getUsers: thunkCreator({
    async promise(params) {
      const {result} = await api.get('users', params);
      return result;
    },
    type: 'GET_USERS',
  }),
  getUser: thunkCreator({
    async promise(id) {
      const {result} = await api.get(`users/${id}`);
      return result;
    },
    type: 'GET_USER',
  }),
  addUser: thunkCreator({
    async promise(user) {
      const {result} = await api.post('users', user);
      return result;
    },
    type: 'ADD_USER',
  }),
  editUser: thunkCreator({
    async promise(user) {
      const {result} = await api.put('users', user);
      return result;
    },
    type: 'EDIT_USER',
  }),
};

const initialState = {
  keys: [],
  entities: {},
  loadingUsers: false,
};

const selectors = {
  mappedKeys(state) {
    return state.keys.length === 0
      ? []
      : state.keys.map(x => state.entities[x]);
  },
  getById(state, id) {
    return state.entities[id];
  },
};

const reducer = handleActions(
  {
    [actionCreators.getUsers.requested]: (state, action) => ({
      ...state,
      loadingUsers: true,
    }),
    [actionCreators.getUsers.resolved]: (state, action) => ({
      ...state,
      keys: action.payload.items.map(x => x.id),
      entities: action.payload.items.reduce((acc, entity) => {
        acc[entity.id] = entity;
        return acc;
      }, state.entities),
      loadingUsers: false,
    }),
    [actionCreators.getUsers.rejected]: (state, action) => ({
      ...state,
      loadingUsers: false,
    }),
    [actionCreators.getUser.requested]: (state, action) => ({
      ...state,
      loadingUsers: true,
    }),
    [actionCreators.getUser.resolved]: (state, action) => ({
      ...state,
      entities: {
        ...state.entities,
        [action.payload.id]: action.payload,
      },
      loadingUsers: false,
    }),
    [actionCreators.getUser.rejected]: (state, action) => ({
      ...state,
      loadingUsers: false,
    }),
    [actionCreators.addUser.requested]: (state, action) => ({
      ...state,
      loadingUsers: true,
    }),
    [actionCreators.addUser.resolved]: (state, action) => ({
      ...state,
      // TODO: talk about this
      // keys: action.payload.map(x => x.id),
      // entities: action.payload.reduce(
      //   (acc, entity) => {
      //     acc[entity.id] = entity;
      //     return acc;
      //   },
      //   state.entities,
      // ),
      loadingUsers: false,
    }),
    [actionCreators.addUser.rejected]: (state, action) => ({
      ...state,
      loadingUsers: false,
    }),
    [actionCreators.editUser.requested]: (state, action) => ({
      ...state,
      loadingUsers: true,
    }),
    [actionCreators.editUser.resolved]: (state, action) => ({
      ...state,
      // TODO: talk about this
      // entities: {
      //   ...state.entities,
      //   [action.payload.id]: action.payload,
      // },
      loadingUsers: false,
    }),
    [actionCreators.editUser.rejected]: (state, action) => ({
      ...state,
      loadingUsers: false,
    }),
  },
  initialState,
);
reducer.actionCreators = actionCreators;
reducer.selectors = selectors;

export default reducer;
