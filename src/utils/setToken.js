const setToken = (tokenKey, token) => {
  return localStorage.setItem(tokenKey, token);
};
const getToken = (tokenKey) => {
  return localStorage.getItem(tokenKey);
};
const removeToken = (tokenKey) => {
  return localStorage.removeItem(tokenKey);
};
export { setToken, getToken, removeToken };
