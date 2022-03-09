export const generateKey = (length) => {
  let ret = '';
  while (ret.length < length) {
    ret += Math.random().toString(32).substring(2);
  }
  return ret.substring(0, length);
};
