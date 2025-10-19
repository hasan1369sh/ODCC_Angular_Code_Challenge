// export interface Education {
//   key: number;
//   value: string;
//   id: number;
// }
export interface Education {
  text: string;
  value: string;
}

export interface PopupMode{
  forAddUser: boolean;
  forEditUser: boolean;
  forViewUser: boolean
}
export class User {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  age: string = '';
  education: Education | null = null;
  profilePhoto: string = '';
  nationalId: string = '';
  birthDate: any | null = null;
}
