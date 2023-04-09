export class IUser {
  id?: number;
  login?: string;
  full_name?: string;
  password?: string;
  email?: string;
  auth_source?: number;
  active?: boolean;
  roles?: string[];
  created?: string;
  updated?: string;
}
