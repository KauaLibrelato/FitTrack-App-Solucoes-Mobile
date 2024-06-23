export interface IFriendship {
  level: number;
  profilePicture: string;
  username: string;
}

export interface IFriends {
  count: number;
  friendship: IFriendship[];
}
