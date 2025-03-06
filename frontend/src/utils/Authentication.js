export const isAuthenticated = () => {
  let userData = JSON.parse(localStorage.getItem("user"));
  return userData !== null;
};

export const getAccessToken = () => {
  let userData = JSON.parse(localStorage.getItem("user"));
  return userData.access;
};

export const getRefreshToken = () => {
  let userData = JSON.parse(localStorage.getItem("user"));
  return userData.refresh;
};

export const getUserRole = () => {
  let userData = JSON.parse(localStorage.getItem("user"));
  return userData.role;
};
