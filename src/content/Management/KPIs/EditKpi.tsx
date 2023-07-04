import { useCallback, useState } from 'react';
import { KPI } from '@/models/kpi';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  TextField
} from '@mui/material';

export type EditKpiModalType = 'new' | 'edit' | 'delete';

export type EditKpiModalProps = {
  onClose: (value: KPI) => void;
  open: boolean;
  selectedValue: KPI;
  type: EditKpiModalType;
};

function EditKpiModal({
  onClose,
  selectedValue,
  open,
  type
}: EditKpiModalProps) {
  const newKPI: KPI = {
    id: '',
    name: '',
    value: '',
    description: '',
    createdAt: new Date()
  };
  const [kpi, setKPI] = useState<KPI>(selectedValue || newKPI);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setKPI({ ...kpi, [name]: value });
    },
    [setKPI]
  );

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>
        {type === 'edit'
          ? 'Edit KPI'
          : type === 'new'
          ? 'New KPI'
          : 'Delete KPI'}
      </DialogTitle>
      <DialogContent>
        {type === 'delete' && (
          <DialogContentText>Are you sure to delete?</DialogContentText>
        )}
        {type !== 'delete' && (
          <Grid container spacing={1} margin={0} width="100%">
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="name"
                  label="Name"
                  value={kpi.name}
                  name="name"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="value"
                  label="Value"
                  value={kpi.value}
                  name="value"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="description"
                  label="Description"
                  value={kpi.description}
                  name="description"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        {type === 'new' && (
          <Button variant="contained" onClick={handleClose} color="success">
            Add
          </Button>
        )}
        {type === 'edit' && (
          <Button variant="contained" onClick={handleClose} color="success">
            Save
          </Button>
        )}
        {type === 'delete' && (
          <Button variant="contained" onClick={handleClose} color="error">
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default EditKpiModal;
