export interface KPI {
  id: string;
  name: string;
  value: string;
  description: string;
  createdAt: Date | string;
}

export interface RecentKPIsList {
  data: KPI[];
  count: number;
}
