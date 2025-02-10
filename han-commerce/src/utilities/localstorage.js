const domainName = "han-commerce";

export const localCall = (type, value) => {
  if (type == "setToken") {
    localStorage.setItem(`${domainName}-token`, value);
  } else if (type == "setUser") {
    value = JSON.stringify(value);
    localStorage.setItem(`${domainName}-user`, value);
  } else if (type == "removeToken") {
    localStorage.removeItem(`${domainName}-token`);
  } else if (type == "removeUser") {
    localStorage.removeItem(`${domainName}-user`);
  }
};
export const globalLogout = (navigate) => {
  localStorage.removeItem(`${domainName}-token`); // or sessionStorage.removeItem('authToken');
  navigate("/login");
};
