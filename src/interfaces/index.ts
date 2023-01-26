export interface IUser {
  [key: number]: number;
  // not sure if the symbol here that is generate as part of the migrations for the user field.
  // just to be safe, I'll leave it here, should we run into trouble, we'll convert to any, not just strictly to a number.
  [key: symbol]: number;
  surName: string;
  givenName: string;
  email: string;
  password: string;
  googleId: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  street: string;
}
