import { Box, Button, Typography, Paper, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormikTextField from '../FormikTextField';
import { adduser } from './LoginSlices';

const SignUpSchema = Yup.object({
  name: Yup.string().required('Name is required').min(3, 'too short'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is Required').min(6, 'Password must be 6 charaters long'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: SignUpSchema,
    onSubmit: values => {
      dispatch(adduser(values));

      navigate('/signin');
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 5, width: '400px' }}>
        <Typography variant="h4">Create Account</Typography>

        <Stack>
          <FormikTextField name="name" label="Name" sx={{ mt: 2, mb: 2 }} formik={formik} />
          <FormikTextField name="email" label="Email" sx={{ mb: 2 }} formik={formik} />

          <FormikTextField name="password" label="Password" type="password" sx={{ mb: 2 }} formik={formik} />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}>
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
export default SignUp;
