export interface UserDetails {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
  created_at: {
    type: Date;
  };
  reading_list: Story[];
}
// ! the ref is a little strange 
export interface Story {
  title: string;
  _id: string;
  userDetails: UserDetails;
  created_at: string;
  content: string;
}
