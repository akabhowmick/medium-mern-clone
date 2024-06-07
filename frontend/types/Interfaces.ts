export interface UserDetails {
  photoURL: string;
  displayName: string;
}

export interface Story {
  title: string;
  _id: string;
  userDetails: UserDetails;
  created_at: string;
}
