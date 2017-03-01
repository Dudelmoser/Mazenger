export default function (reducers, params = []) {
  const keys = Object.keys(reducers);

  return (inputState = Map(), action) => inputState
    .withMutations((tempState) => {
      keys.forEach((key) => {
        const reducer = reducers[key];
        const curSubState = tempState.get(key);
        const nextSubState = reducer(curSubState, action, ...params);
        if (nextSubState)
          tempState.set(key, nextSubState);
      });
    });
}
