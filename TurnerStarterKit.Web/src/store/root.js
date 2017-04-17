import {combineReducers} from 'redux';
import identity from './identity';

// add reducers here, actions will be pulled automatically...
const reducerTree = {
  identity,
};

const rootReducer = combineReducers(reducerTree);

function exportReducerProp(propName) {
  return Object.keys(reducerTree).reduce((result, key) => {
    result[key] = reducerTree[key][propName];
    return result;
  }, {});
}

export const actions = exportReducerProp('actionCreators');
export const selectors = exportReducerProp('selectors');
export default rootReducer;
