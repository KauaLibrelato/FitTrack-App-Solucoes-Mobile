export interface IUser {
  id: string;
  username: string;
  profilePicture: string;
  level: number;
  friends: [
    {
      isAccepted: boolean;
    },
  ];
}
