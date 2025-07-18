
export interface AccountData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BasicInfoData {
  firstName: string;
  lastName: string;
  year?: string;
  month?: string;
  day?: string;
  birthday: string;
}

export interface DetailData {
  country: string;
  gender: string;
  avatar: string;
}

export type FormData = {
  account: AccountData;
  basicInfo: BasicInfoData;
  detail: DetailData;
};

export type RegistrationStep = 'basicInfo' | 'detail' | 'account' | 'confirmation';

// step props
export interface StepProps {
  onNext: () => void;
  onPrev: () => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
}

export interface SelectOption {
  value: string;
  label: string;
}