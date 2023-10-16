export interface Signin {
  email?: string;
  password?: string;
  remember?: boolean;
}

export interface Signup {
  email?: string;
  password?: string;
}

export interface Signout {
  email?: string;
}
