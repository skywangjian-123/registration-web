import { RegistrationStep, SelectOption } from "./interfaces";

export const ALL_STEPS: RegistrationStep[] = ['basicInfo', 'contactInfo', 'detail', 'account', 'confirmation'];


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

export const RELATIONSHIPS: SelectOption[] = [
  { value: "spouse", label: 'Spouse' },
  { value: "child", label: 'Child' },
  { value: "parent", label: 'Parent' },
  { value: "sibling", label: 'Sibling' },
  { value: "friend", label: 'Friend' },
  { value: "colleague", label: 'Colleague' },
  { value: "other", label: 'Other' }
]