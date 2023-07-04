import { useState, ReactNode, createContext, useEffect } from 'react';

import { KPI } from '@/models/kpi';
import {
  getRecentKPIs,
  addKPI,
  updateKPI as changeKPI,
  removeKPI as deleteKPI
} from '@/services/kpi.service';
import { useNotify } from '@/services/notify.service';
type KPIContext = {
  data: KPI[];
  page: number;
  limit: number;
  totalCount: number;
  loading: boolean;
  fetchKPIs: (page: number, limit: number) => void;
  updateKPI: (id: string, kpi: KPI) => void;
  removeKPI: (id: string) => void;
  addKPI: (kpi: KPI) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

const initKPIContext: KPIContext = {
  data: [] as KPI[],
  page: 0,
  limit: 5,
  totalCount: 0,
  loading: true,
  fetchKPIs: () => {},
  updateKPI: () => false,
  removeKPI: () => false,
  addKPI: () => false,
  setPage: () => {},
  setLimit: () => {}
};
export const KPIContext = createContext<KPIContext>(initKPIContext);

type Props = {
  children: ReactNode;
};

export function KPIProvider({ children }: Props) {
  const notifier = useNotify();

  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [kpis, setKPIs] = useState<KPI[]>([]);

  const fetchRecentKPIs = (page: number, limit: number) => {
    setLoading(true);
    getRecentKPIs(page, limit)
      .then(({ data, count }) => {
        setTotalCount(count);
        setKPIs(data);
      })
      .catch(() => {
        notifier.error(`Failed to get the recent KPIs`);
      });
    setLoading(false);
  };

  const addNewKPI = (value: KPI) => {
    setLoading(true);
    addKPI(value)
      .then((newKPI) => {
        notifier.success(`Create a new KPI successfully`);
        if (page === 0) {
          setKPIs([newKPI, ...kpis].slice(0, limit));
        }
        setTotalCount(totalCount + 1);
      })
      .catch(() => {
        notifier.error(`Failed to create`);
      });
    setLoading(false);
  };

  const updateKPI = (id: string, value: KPI) => {
    setLoading(true);
    changeKPI(id, value)
      .then((newKPI) => {
        notifier.success(`Updated successfully`);
        setKPIs(kpis.map((kpi) => (kpi.id === newKPI.id ? newKPI : kpi)));
        kpis.forEach((kpi) => {
          if (kpi.id === newKPI.id) {
            kpi.name = newKPI.name;
            kpi.description = newKPI.description;
            kpi.value = newKPI.value;
            kpi.createdAt = newKPI.createdAt;
          }
        });
      })
      .catch(() => notifier.error(`Failed to update`));
    setLoading(false);
  };

  const removeKPI = (id: string) => {
    setLoading(true);
    deleteKPI(id)
      .then(() => {
        notifier.success('Removed successfully');
        fetchRecentKPIs(page + 1, limit);
      })
      .catch(() => notifier.error(`Failed to remove`));
    setLoading(false);
  };

  useEffect(() => {
    fetchRecentKPIs(page + 1, limit);
  }, [page, limit]);

  return (
    <KPIContext.Provider
      value={{
        data: kpis,
        page,
        limit,
        totalCount,
        loading,
        setPage,
        setLimit,
        addKPI: addNewKPI,
        fetchKPIs: fetchRecentKPIs,
        updateKPI,
        removeKPI
      }}
    >
      {children}
    </KPIContext.Provider>
  );
}
