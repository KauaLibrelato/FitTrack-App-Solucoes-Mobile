import apiAuth from "../infra/apiAuth";
import { API_ENDPOINTS } from "../utils/apis";

export interface UserUpdateData {
  email?: string;
  username?: string;
  height?: number;
  weight?: number;
}

export interface PasswordUpdateData {
  password: string;
  newPassword: string;
}

export const userService = {
  async getUserInfo() {
    const response = await apiAuth.get(API_ENDPOINTS.USER.INFO);
    return response.data.user;
  },

  async updateUser(userData: UserUpdateData) {
    const response = await apiAuth.put(API_ENDPOINTS.USER.UPDATE, userData);
    return response.data;
  },

  async updatePassword(passwordData: PasswordUpdateData) {
    const response = await apiAuth.put(API_ENDPOINTS.USER.UPDATE_PASSWORD, passwordData);
    return response.data;
  },

  async deleteUser() {
    const response = await apiAuth.delete(API_ENDPOINTS.USER.DELETE);
    return response.data;
  },

  async getUserList(page = 1, offset = 50) {
    const response = await apiAuth.get(`${API_ENDPOINTS.USER.LIST}?page=${page}&offset=${offset}`);
    return response.data.users;
  },
};
