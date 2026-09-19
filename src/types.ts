export type PageView = 'home' | 'contact';

export interface ServiceOption {
  id: string;
  title: string;
  category: string;
  description: string;
  popular?: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  selectedServices: string[];
  budget: string;
  timeline: string;
  message: string;
}
