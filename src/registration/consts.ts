import { RegistrationStep, SelectOption } from "./interfaces";

export const ALL_STEPS: RegistrationStep[] = ['basicInfo', 'detail', 'account', 'confirmation'];


export const COUNTRIES: SelectOption[] = [
  {value: "ch", label: 'China'},
  {value: "us", label: 'United State'},
  {value: "uk", label: 'United Kingdom'}
];

export const GENDERS: SelectOption[] = [
  {value: "M", label: 'Male'},
  {value: "F", label: 'Female'},
  {value: "O", label: 'Other'}
]