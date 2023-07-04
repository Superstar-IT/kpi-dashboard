import { FC, ChangeEvent, useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Stack
} from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditKpiModal, { EditKpiModalType } from './EditKpi';
import { KPI } from '@/models/kpi';
import { KPIContext } from '@/contexts/KPIContext';

interface RecentKPIsTableProps {
  className?: string;
  editable?: boolean;
}

const RecentKPIsTable: FC<RecentKPIsTableProps> = ({ editable }) => {
  const theme = useTheme();
  const {
    data,
    loading,
    totalCount,
    page,
    limit,
    fetchKPIs,
    setPage,
    setLimit
  } = useContext(KPIContext);

  const [selectedKPI, setKPI] = useState<KPI | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [action, setAction] = useState<EditKpiModalType>('edit');

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleActionClick = (kpi: KPI, action: EditKpiModalType): void => {
    setAction(action);
    setKPI(kpi);
    setOpenEditModal(true);
  };

  useEffect(() => {
    fetchKPIs(page, limit);
  }, []);

  return (
    <Card>
      <CardHeader title="Recent KPIs" />
      <Divider />
      {loading ? (
        <Stack alignItems="center" minHeight="400px" justifyContent="center">
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  {editable && <TableCell align="right">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((kpi) => {
                  const isKPISelected = selectedKPI?.id === kpi.id;
                  return (
                    <TableRow hover key={kpi.id} selected={isKPISelected}>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {kpi.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {kpi.value}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {kpi.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {format(new Date(kpi.createdAt), 'MMMM dd yyyy')}
                        </Typography>
                      </TableCell>
                      {editable && (
                        <TableCell align="right">
                          <Tooltip title="Edit" arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.colors.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color="inherit"
                              size="small"
                              onClick={() => handleActionClick(kpi, 'edit')}
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete" arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.colors.error.lighter
                                },
                                color: theme.palette.error.main
                              }}
                              color="inherit"
                              size="small"
                              onClick={() => handleActionClick(kpi, 'delete')}
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={totalCount}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </>
      )}

      <EditKpiModal
        open={openEditModal}
        selectedValue={selectedKPI}
        onClose={() => setOpenEditModal(false)}
        type={action}
      />
    </Card>
  );
};

export default RecentKPIsTable;
