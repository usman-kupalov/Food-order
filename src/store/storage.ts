export const loadState = <T>(key: string): T | undefined => {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) {
      return undefined;
    }

    return JSON.parse(jsonState);
  } catch (error) {
    console.error(error);
  }
};

export const saveState = <T>(state: T, key: string) => {
  try {
    const jsonState = JSON.stringify(state);
    localStorage.setItem(key, jsonState);
  } catch (error) {
    console.error(error);
  }
};
