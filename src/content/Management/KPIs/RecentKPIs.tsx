import { Card } from '@mui/material';
import RecentKPIsTable from './RecentKPIsTable';

export type RecentKPIsProps = {
  editable?: boolean;
};

function RecentKPIs({ editable }: RecentKPIsProps) {
  return (
    <Card>
      <RecentKPIsTable editable={editable} />
    </Card>
  );
}

export default RecentKPIs;
