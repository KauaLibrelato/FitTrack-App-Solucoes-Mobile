import apiAuth from "../../infra/apiAuth";
import { API_ENDPOINTS } from "../../utils/apis";
import { userService } from "../userService";

jest.mock("../../infra/apiAuth");
const mockedApiAuth = apiAuth as jest.Mocked<typeof apiAuth>;

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserInfo", () => {
    it("should return user info successfully", async () => {
      const mockUser = {
        id: "1",
        username: "testuser",
        email: "test@example.com",
        level: 5,
        experiencePoints: 1500,
      };
      const mockResponse = { data: { user: mockUser } };
      mockedApiAuth.get.mockResolvedValueOnce(mockResponse);

      const result = await userService.getUserInfo();

      expect(mockedApiAuth.get).toHaveBeenCalledWith(API_ENDPOINTS.USER.INFO);
      expect(result).toEqual(mockUser);
    });

    it("should throw error when request fails", async () => {
      const mockError = {
        response: {
          data: { message: "Unauthorized" },
        },
      };
      mockedApiAuth.get.mockRejectedValueOnce(mockError);

      await expect(userService.getUserInfo()).rejects.toEqual(mockError);
    });
  });

  describe("updateUser", () => {
    it("should update user successfully", async () => {
      const userData = {
        username: "updateduser",
        email: "updated@example.com",
        height: 180,
        weight: 75,
      };
      const mockResponse = { data: { success: true } };
      mockedApiAuth.put.mockResolvedValueOnce(mockResponse);

      const result = await userService.updateUser(userData);

      expect(mockedApiAuth.put).toHaveBeenCalledWith(API_ENDPOINTS.USER.UPDATE, userData);
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle partial updates", async () => {
      const partialData = { username: "newusername" };
      const mockResponse = { data: { success: true } };
      mockedApiAuth.put.mockResolvedValueOnce(mockResponse);

      await userService.updateUser(partialData);

      expect(mockedApiAuth.put).toHaveBeenCalledWith(API_ENDPOINTS.USER.UPDATE, partialData);
    });

    it("should throw error when update fails", async () => {
      const userData = { username: "invaliduser" };
      const mockError = {
        response: {
          data: { message: "Username already taken" },
        },
      };
      mockedApiAuth.put.mockRejectedValueOnce(mockError);

      await expect(userService.updateUser(userData)).rejects.toEqual(mockError);
    });
  });

  describe("updatePassword", () => {
    it("should update password successfully", async () => {
      const passwordData = {
        password: "oldpassword",
        newPassword: "newpassword123",
      };
      const mockResponse = { data: { success: true } };
      mockedApiAuth.put.mockResolvedValueOnce(mockResponse);

      const result = await userService.updatePassword(passwordData);

      expect(mockedApiAuth.put).toHaveBeenCalledWith(API_ENDPOINTS.USER.UPDATE_PASSWORD, passwordData);
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw error when old password is incorrect", async () => {
      const passwordData = {
        password: "wrongpassword",
        newPassword: "newpassword123",
      };
      const mockError = {
        response: {
          data: { message: "Current password is incorrect" },
        },
      };
      mockedApiAuth.put.mockRejectedValueOnce(mockError);

      await expect(userService.updatePassword(passwordData)).rejects.toEqual(mockError);
    });
  });

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      const mockResponse = { data: { success: true } };
      mockedApiAuth.delete.mockResolvedValueOnce(mockResponse);

      const result = await userService.deleteUser();

      expect(mockedApiAuth.delete).toHaveBeenCalledWith(API_ENDPOINTS.USER.DELETE);
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw error when deletion fails", async () => {
      const mockError = {
        response: {
          data: { message: "Cannot delete user" },
        },
      };
      mockedApiAuth.delete.mockRejectedValueOnce(mockError);

      await expect(userService.deleteUser()).rejects.toEqual(mockError);
    });
  });

  describe("getUserList", () => {
    it("should return user list with default pagination", async () => {
      const mockUsers = [
        { id: "1", username: "user1" },
        { id: "2", username: "user2" },
      ];
      const mockResponse = { data: { users: mockUsers } };
      mockedApiAuth.get.mockResolvedValueOnce(mockResponse);

      const result = await userService.getUserList();

      expect(mockedApiAuth.get).toHaveBeenCalledWith(`${API_ENDPOINTS.USER.LIST}?page=1&offset=50`);
      expect(result).toEqual(mockUsers);
    });

    it("should return user list with custom pagination", async () => {
      const mockUsers = [{ id: "1", username: "user1" }];
      const mockResponse = { data: { users: mockUsers } };
      mockedApiAuth.get.mockResolvedValueOnce(mockResponse);

      const result = await userService.getUserList(2, 10);

      expect(mockedApiAuth.get).toHaveBeenCalledWith(`${API_ENDPOINTS.USER.LIST}?page=2&offset=10`);
      expect(result).toEqual(mockUsers);
    });

    it("should handle empty user list", async () => {
      const mockResponse = { data: { users: [] } };
      mockedApiAuth.get.mockResolvedValueOnce(mockResponse);

      const result = await userService.getUserList();

      expect(result).toEqual([]);
    });
  });
});
