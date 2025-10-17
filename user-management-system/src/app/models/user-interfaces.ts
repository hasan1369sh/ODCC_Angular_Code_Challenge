export interface Education {
  key: number;
  value: string;
  id: number;
}

export class User {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  age: number = 0;
  education: Education | null = null;
  profilePhoto: string = '';
  nationalId: number = 0;
  birthDate: string | null = null;
}
