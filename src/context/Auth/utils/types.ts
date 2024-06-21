export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginRequestResponse {
  email: string;
  password: string;
  logged: () => void;
}

export interface IAuthContext {
  signin: any;
  signout: () => void;
  accessToken: string;
  setAccessToken: (setAccessToken: string) => void;
}
