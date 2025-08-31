export interface EditProfileFormData {
  name: string;
  phone: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  theme: 'light' | 'dark' | 'system';
}
