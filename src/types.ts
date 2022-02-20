export interface InsectOption {
  title: string;
  value: string;
}
  
export interface InsectProps {
  prefixIcon?: string | React.ReactNode | null;
  suffixIcon?: string | React.ReactNode | null;
  dropdownIcon?: string | React.ReactNode | null;
  checkmarkIcon?: string | React.ReactNode | null;
  placeholder?: string;
  value?: string;
  label?: string;
  name: string;
  className?: string;
  labelClass?: string;
  inputWrapperClass?: string;
  inputClass?: string;
  iconsClass?: string;
  checkerClass?: string;
  dropdownClass?: string;
  type?: "text" | "number" | "password" | "email" | "select" | "textarea";
  defaultOption?: InsectOption;
  options?: InsectOption[];
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelect?: (value: string | string[] | null, name: string) => void;
  closeOnBlur?: boolean;
  allowMultiple?: number;
  search?: boolean;
  rows?: number;
}