import { ReactNode } from "react";

export interface Language {
  name: string;
  icon: string;
  description: string;
  categories: string[];
  link: string;
  materials: Material[];
  published: boolean;
}

export interface Material {
  title: string;
  content: string;
  codeExample?: string;
  terminalCommands?: string[];
}

export interface FormData {
  name: string;
  icon: string;
  description: string;
  categories: string[];
  link: string;
  materials: Material[];
  published: boolean;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;

export interface SubmitButtonProps {
  isLoading: boolean;
  isFormValid: boolean;
  handleSubmit: () => void;
  children?: ReactNode;
}

export interface FormFieldsProps {
  formData: any;
  formErrors: any;
  setFormData: (data: any) => void;
  setFormErrors: (errors: any) => void;
}

export interface MaterialInputProps {
  materials: Material[];
  setFormData: (data: any) => void;
  formErrors: any;
  setFormErrors: (errors: any) => void;
}

export interface CULanguageModalProps {
  onClose: () => void;
  mode?: "add" | "update";
  languageToUpdate?: Language;
}
