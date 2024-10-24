export interface IEmployee {
  id: string;
  name: string;
  email_address: string;
  phone_number: number;
  gender: Gender;
  days_worked: number;
  cafe: string;
}

export enum Gender {
  Male = 0,
  Female = 1,
}
