import * as Yup from 'yup';

export const KPISchema = Yup.object({
  name: Yup.string().required('Name required'),
  value: Yup.string().required('Value required'),
  description: Yup.string().required('Description required')
});
