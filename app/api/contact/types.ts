export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSuccessResponse {
  message: string;
}

export interface ContactErrorResponse {
  error: string;
} 