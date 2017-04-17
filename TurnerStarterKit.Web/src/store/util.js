export function thunkCreator(action) {
  const {type, promise, metaCreator = () => null} = action;

  fn.requested = `${type}_REQUESTED`;
  fn.resolved = `${type}_RESOLVED`;
  fn.rejected = `${type}_REJECTED`;

  return fn;

  function fn(...args) {
    return async function(dispatch, getState) {
      let meta;
      meta = metaCreator(fn.requested, ...args);

      dispatch({type: fn.requested, payload: args, meta});

      try {
        const payload = await promise(...args);
        meta = metaCreator(fn.resolved, ...args);
        dispatch({type: fn.resolved, payload, meta});
        return payload;
      } catch (error) {
        meta = metaCreator(fn.rejected, ...args);
        dispatch({type: fn.rejected, error, meta});
        throw error;
      }
    };
  }
}

export const mergeProps = props => (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  ...props,
});
