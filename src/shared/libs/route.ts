export const generatePath = (path: string, params?: Record<string, string | number>) => {
  if (!path.includes(':')) return path;

  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    if (!params || params[key] === undefined) {
      throw new Error(`Missing param: ${key}`);
    }
    return String(params[key]);
  });
};
