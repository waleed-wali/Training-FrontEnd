import { Typography, Box, Button, Paper, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikTextField from '../FormikTextField';
import { loginSuccess, setErrors } from './LoginSlices';

const SignInSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is Required').min(6, 'Password must be 6 charaters long'),
});
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.auth.users);
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: values => {
      const user = users.find(u => u.email === values.email && u.password === values.password);
      if (user) {
        dispatch(loginSuccess(user));
        navigate('/dashboard');
      } else {
        setErrors({ password: 'Invalid email or password' });
      }

      navigate('/dashboard');
    },
  });
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 5, width: '400px' }}>
        <Typography variant="h4">Sign In</Typography>

        <Stack>
          <FormikTextField name="email" label="Email" sx={{ mt: 2, mb: 2 }} formik={formik} />
          <FormikTextField name="password" label="password" type="password" sx={{ mb: 2 }} formik={formik} />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}>
            Sign In
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
export default SignIn;
