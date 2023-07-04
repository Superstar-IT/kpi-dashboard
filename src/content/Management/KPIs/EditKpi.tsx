import { useCallback, useContext } from 'react';
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
import { useFormik } from 'formik';

import { KPISchema } from '@/schema/kpi.schema';
import { KPIContext } from '@/contexts/KPIContext';

export type EditKpiModalType = 'new' | 'edit' | 'delete';

export type EditKpiModalProps = {
  onClose: () => void;
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
  const { removeKPI, updateKPI, addKPI } = useContext(KPIContext);

  const handleClose = () => {
    editForm.resetForm();
    onClose();
  };

  const handleDelete = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      editForm.setSubmitting(true);
      removeKPI(selectedValue.id);
      editForm.setSubmitting(false);
      onClose();
    },
    [onClose]
  );

  const editForm = useFormik({
    initialValues: {
      name: selectedValue?.name || '',
      value: selectedValue?.value || '',
      description: selectedValue?.description || ''
    },
    enableReinitialize: true,
    validationSchema: KPISchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      if (type === 'edit' && selectedValue?.id) {
        if (
          values.name !== selectedValue?.name ||
          values.description !== selectedValue?.description ||
          values.value !== selectedValue?.value
        ) {
          updateKPI(selectedValue.id, values as KPI);
        }
      } else if (type === 'new') {
        addKPI(values as KPI);
      }
      setSubmitting(false);
      handleClose();
    }
  });

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
                  name="name"
                  placeholder="KPI Name"
                  value={editForm.values.name}
                  onChange={editForm.handleChange}
                  onBlur={editForm.handleBlur}
                  error={editForm.touched.name && Boolean(editForm.errors.name)}
                  helperText={editForm.touched.name && editForm.errors.name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="value"
                  label="Value"
                  placeholder="KPI Value"
                  name="value"
                  value={editForm.values.value}
                  onChange={editForm.handleChange}
                  onBlur={editForm.handleBlur}
                  error={
                    editForm.touched.value && Boolean(editForm.errors.value)
                  }
                  helperText={editForm.touched.value && editForm.errors.value}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="description"
                  label="Description"
                  placeholder="KPI Description"
                  name="description"
                  value={editForm.values.description}
                  onChange={editForm.handleChange}
                  onBlur={editForm.handleBlur}
                  error={
                    editForm.touched.description &&
                    Boolean(editForm.errors.description)
                  }
                  helperText={
                    editForm.touched.description && editForm.errors.description
                  }
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
          <Button
            variant="contained"
            onClick={editForm.handleSubmit}
            color="success"
            disabled={!editForm.isValid || editForm.isSubmitting}
          >
            Add
          </Button>
        )}
        {type === 'edit' && (
          <Button
            variant="contained"
            onClick={editForm.handleSubmit}
            color="success"
            disabled={!editForm.isValid || editForm.isSubmitting}
          >
            Save
          </Button>
        )}
        {type === 'delete' && (
          <Button
            variant="contained"
            onClick={handleDelete}
            color="error"
            disabled={editForm.isSubmitting}
          >
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default EditKpiModal;
