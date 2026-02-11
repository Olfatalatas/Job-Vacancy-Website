export interface Vacancy {
  id: number;
  title: string;
  position: string;
  job_type: string;
  candidates_needed: number;
  expires_at: string;
  location: string;
  is_remote: boolean;
  description: string;
  salary_min?: number;
  salary_max?: number;
  show_salary: boolean;
  min_experience: string;
  company_name: string;
  company_logo?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}