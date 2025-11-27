import { TextField } from '@mui/material';

const FormikTextField = ({ name, label, formik, type = 'text', ...props }) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={formik.values[name] ?? ''}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    />
  );
};
export default FormikTextField;
