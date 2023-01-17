const actions = new Map<string, Function>();

export const addActions = (newActions: { [k: string]: Function }) => {
  for (const key in newActions) {
    actions.set(key, newActions[key]);
  }
};

export const hasAction = (key: string) => actions.has(key);

export const deleteAction = (key: string) => {
  actions.delete(key);
};

export const resetActions = () => {
  actions.clear();
};

export const playAction = (key: string) => {
  const toPlay = actions.get(key);
  if (toPlay === undefined)
    throw new Error(`the action : ${key} does not exists`);
  return toPlay();
};
