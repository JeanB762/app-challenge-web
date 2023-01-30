import { AxiosResponse } from 'axios';
import { api } from './api';

export async function getUnits(): Promise<AxiosResponse> {
  const response = await api.get('/units');
  return response;
}

export async function updateUnit(
  id: string,
  values: any
): Promise<AxiosResponse> {
  const response = await api.put(`/units/${id}`, values);
  return response;
}

export async function createUnit(values: any): Promise<AxiosResponse> {
  const response = await api.post('/units', values);
  return response;
}

export async function deleteUnit(id: string): Promise<AxiosResponse> {
  const response = await api.delete(`/units/${id}`);
  return response;
}
