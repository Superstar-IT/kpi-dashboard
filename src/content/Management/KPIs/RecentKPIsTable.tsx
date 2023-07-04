import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
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
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditKpiModal, { EditKpiModalType } from './EditKpi';
import { KPI } from '@/models/kpi';

interface RecentKPIsTableProps {
  className?: string;
  data: KPI[];
  editable?: boolean;
}

const applyPagination = (data: KPI[], page: number, limit: number): KPI[] => {
  return data.slice(page * limit, page * limit + limit);
};

const RecentKPIsTable: FC<RecentKPIsTableProps> = ({ data, editable }) => {
  const theme = useTheme();

  const [selectedKPI, setKPI] = useState<KPI | null>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [action, setAction] = useState<EditKpiModalType>('edit');

  const handleClose = (kpi: KPI): void => {
    setKPI(kpi);
    setOpenEditModal(false);
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleActionClick = (kpi: KPI, action: EditKpiModalType): void => {
    console.log({ kpi });
    setAction(action);
    setKPI(kpi);
    setOpenEditModal(true);
  };

  const paginatedKPIs = applyPagination(data, page, limit);

  return (
    <Card>
      <CardHeader title="Recent KPIs" />
      <Divider />
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
            {paginatedKPIs.map((kpi) => {
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
                    <Typography variant="body2" color="text.secondary" noWrap>
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
          count={data.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <EditKpiModal
        open={openEditModal}
        selectedValue={selectedKPI}
        onClose={handleClose}
        type={action}
      />
    </Card>
  );
};

RecentKPIsTable.propTypes = {
  data: PropTypes.array.isRequired
};

RecentKPIsTable.defaultProps = {
  data: []
};

export default RecentKPIsTable;
