export interface User {
  name: string;
  dateOfBirth: string;
  age: number;
  aadharNumber: string;
  address: string;
  password: string;
  mobileNumber: string;
  panNumber: string;
  gender: 'male' | 'female' | 'other';
  accountNumber: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export type LoanType = 'home' | 'car' | 'education' | 'personal';