import { Card } from '@mui/material';
import { subDays } from 'date-fns';
import RecentKPIsTable from './RecentKPIsTable';
import { KPI } from '@/models/kpi';

export type RecentKPIsProps = {
  editable?: boolean;
};

const values: string[] = [
  'VUVX709ET7BY',
  '23M3UOG65G8K',
  'F6JHK65MS818',
  'QJFAI7N84LGM',
  'BO5KFSYGC0YW',
  '479KUYHOBMJS',
  '6RS606CBMKVQ',
  '63GJ5DJFKS4H',
  'W67CFZNT71KR'
];

function RecentKPIs({ editable }: RecentKPIsProps) {
  const data: KPI[] = values.map((value, idx) => ({
    id: +idx,
    name: 'Fiat Deposit',
    createdAt: subDays(new Date(), idx),
    value,
    description: 'Bank Account'
  }));

  return (
    <Card>
      <RecentKPIsTable data={data} editable={editable} />
    </Card>
  );
}

export default RecentKPIs;
