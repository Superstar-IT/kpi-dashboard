import { useState, useCallback } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import EditKpiModal from './EditKpi';

function PageHeader() {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = useCallback(
    (value: any) => {
      console.log({ value });
      setOpenModal(false);
    },
    [setOpenModal]
  );

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          KPIs
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => setOpenModal(true)}
        >
          New
        </Button>
        <EditKpiModal
          open={openModal}
          selectedValue={null}
          onClose={handleClose}
          type="new"
        />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
