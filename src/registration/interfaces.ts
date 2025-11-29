
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

export interface ContactInfoData {
  phone: string;
  address: string;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface DetailData {
  country: string;
  gender: string;
  avatar: string;
}

export type FormData = {
  account: AccountData;
  basicInfo: BasicInfoData;
  contactInfo: ContactInfoData;
  detail: DetailData;
};

export type RegistrationStep = 'basicInfo' | 'contactInfo' | 'detail' | 'account' | 'confirmation';

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