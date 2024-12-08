export interface HomeLoanDetails {
  propertyType: 'flat' | 'bungalow' | 'villa';
  currentValuation: number;
  surveyNumber: string;
}

export interface CarLoanDetails {
  brand: string;
  model: string;
  manufacturingYear: number;
}

export interface EducationLoanDetails {
  courseName: string;
  institutionName: string;
  courseDuration: number;
  previousScore: number;
}

export interface PersonalLoanDetails {
  purpose: string;
  employmentType: string;
  employmentYears: number;
}

export interface LoanApplication {
  loanType: 'home' | 'car' | 'education' | 'personal';
  amount: number;
  tenure: number;
  cibilScore: number;
  creditScore: number;
  monthlyIncome: number;
  documents: {
    bankStatement: File | null;
    aadharCard: File | null;
    panCard: File | null;
    incomeCertificate: File | null;
    utilityBill?: File | null;
    rcBook?: File | null;
    '10thMarksheet'?: File | null;
    '12thMarksheet'?: File | null;
  };
  loanDetails?: HomeLoanDetails | CarLoanDetails | EducationLoanDetails | PersonalLoanDetails;
}

export const loanLimits = {
  home: {
    min: 500000,
    max: 10000000,
  },
  car: {
    min: 100000,
    max: 2000000,
  },
  education: {
    min: 100000,
    max: 5000000,
  },
  personal: {
    min: 50000,
    max: 1000000,
  },
};