import { AxiosResponse } from 'axios';
import { api } from './api';

export async function getCompanies(): Promise<AxiosResponse> {
  const response = await api.get('/company');
  return response;
}

export async function createCompany(values: any): Promise<AxiosResponse> {
  const response = await api.post('/company', values);
  return response;
}

export async function updateCompany(
  id: string,
  values: any
): Promise<AxiosResponse> {
  const response = await api.put(`/company/${id}`, values);
  return response;
}

export async function deleteCompany(id: string): Promise<AxiosResponse> {
  const response = await api.delete(`/company/${id}`);
  return response;
}
