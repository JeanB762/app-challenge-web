import { AxiosResponse } from 'axios';
import { api } from './api';

export async function getAssets(): Promise<AxiosResponse> {
  const response = await api.get('/assets');
  return response;
}

export async function createAssets(values: FormData): Promise<AxiosResponse> {
  const response = await api.post(`/assets`, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function updateAssets(
  id: string,
  values: FormData
): Promise<AxiosResponse> {
  const response = await api.put(`/assets/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function deleteAssets(id: string): Promise<AxiosResponse> {
  const response = await api.delete(`/assets/${id}`);
  return response;
}
