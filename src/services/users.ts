import { AxiosResponse } from 'axios';
import { api } from './api';

export async function getUsers(): Promise<AxiosResponse> {
  const response = await api.get('/accounts');
  return response;
}

export async function createUser(values: FormData): Promise<AxiosResponse> {
  const response = await api.post(`/accounts`, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function updateUser(
  id: string,
  values: FormData
): Promise<AxiosResponse> {
  const response = await api.put(`/accounts/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function deleteUser(id: string): Promise<AxiosResponse> {
  const response = await api.delete(`/accounts/${id}`);
  return response;
}
