import { postData, fetchData } from "../apiService";

export const authLogin = async (data: { email: string; password: string }) => {
  return postData("/auth/login", data);
};

export const authSignup = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return postData("/auth/register", data);
};

export const getShopByOwnerId = async (ownerId: string) => {
  return fetchData(`/shops/owner/${ownerId}`);
};
