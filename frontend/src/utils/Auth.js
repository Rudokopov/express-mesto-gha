// auth.js

export const BASE_URL = "https://api.mesto-rudokopov.nomoredomains.monster";

export const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(checkStatus);
};

export const register = (email, password) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const getContent = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
