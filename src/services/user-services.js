import { workAxios } from "./helper";

export const signUp = async (user) => {
  const response = await workAxios.post("/users/signup", user);
  return response.data;
};

export const loginUser = async (loginDetail) => {
  const response = await workAxios.post("/users/login", loginDetail);
  return response.data;
};
