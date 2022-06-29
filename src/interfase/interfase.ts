export interface IUser {
  username: string;
  avatarUrl: string;
}
export interface ISearchFormData {
  id: number;
  name: string;
}

export interface IFavoriteItems {
  [key: string]: IFavoriteItem;
}
export interface IFavoriteItem {
  id: string;
  name: string;
  image: string;
}
