import axios from 'axios';

import { KPI, RecentKPIsList } from '@/models/kpi';

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const getRecentKPIs = async (
  page?: number,
  limit?: number
): Promise<RecentKPIsList> => {
  return await axios
    .get('/kpis', {
      params: { page: page || 1, limit: limit || 10 }
    })
    .then((res) => res.data as RecentKPIsList);
};

export const removeKPI = async (id: string): Promise<boolean> => {
  return await axios.delete(`/kpis/${id}`).then((res) => res.status === 204);
};

export const updateKPI = async (id: string, kpi: KPI): Promise<KPI> => {
  return await axios.patch(`/kpis/${id}`, kpi).then((res) => res.data as KPI);
};

export const addKPI = async (kpi: KPI): Promise<KPI> => {
  return await axios.post('/kpis', kpi).then((res) => res.data as KPI);
};
