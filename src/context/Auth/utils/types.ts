import { IUser } from "../../../utils/types";
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginRequestResponse {
  email: string;
  password: string;
}

export interface IAuthContext {
  user: IUser | null;
  setUser: (setUser: IUser) => void;
  signin: any;
  signout: () => void;
  accessToken: string;
  setAccessToken: (setAccessToken: string) => void;
}
