export default (key: string, alternative?: string): string => {
  if (!key) {
    throw new Error('You must provide key argument');
  }
  if (!process.env[key] && !alternative) {
    const message = `No ${key} Variable and No alternatives provided`;
    throw new Error(message);
  }
  return process.env[key] || alternative;
};
