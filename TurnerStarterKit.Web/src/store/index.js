import identity from './identity';

const rootReducer = {
  identity,
};

const actions = exportReducerProp('actionCreators');
const selectors = exportReducerProp('selectors');

function exportReducerProp(propName) {
  return Object.keys(rootReducer).reduce((result, key) => {
    result[key] = rootReducer[key][propName];
    return result;
  }, {});
}

export {actions, selectors};
export default rootReducer;
