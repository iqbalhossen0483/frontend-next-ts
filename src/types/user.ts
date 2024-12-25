export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export enum Gender {
  Male = "male",
  Female = "female",
  NotSay = "not_say",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  password: string;
  avatar?: string;
  role: Role;
  contact: string;
  gender: Gender;
  isVerified: boolean;
  createdAt: Date;
}
