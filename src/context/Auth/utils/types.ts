export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginRequestResponse {
  email: string;
  password: string;
  logged: VoidFunction;
}

export interface IAuthContext {
  signin: ({ email, password, logged }: ILoginRequestResponse) => Promise<void>;
  signout: VoidFunction;
  accessToken: string;
  setAccessToken: (setAccessToken: string) => void;
}
