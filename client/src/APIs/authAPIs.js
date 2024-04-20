import apiRequest from "./Common/apiCall";

export const login = async (data) => {
  const res = await apiRequest("POST", "user/signin", data, true);
  return res;
};

export const signUp = async (data) => {
  const res = await apiRequest("POST", "user/signup", data, true);
  return res;
};
