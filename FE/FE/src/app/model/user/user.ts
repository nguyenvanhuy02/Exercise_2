import {Account} from "./account";

export interface User {
  id?: number;
  name?: string;
  account?: Account;
  birthDay?: string;
  address?: string;
  email?: string;
}
