import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { login, loggout, is_logged } from 'src/utils/loginAxios';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'

const Login = () => {
  const [Upload, setUpload] = useState(false)
  const [UploadFailed, setUploadFailed] = useState(null)
  const [CaptchaSuccess, SetCaptchaSuccess] = useState(null)
  const [IsLogged, setIsLogged] = useState(null)

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    })
  });

  const onCaptchaCompleted = (e) => {
    console.log(e);
    SetCaptchaSuccess(e != null);
  }

  useEffect(async () => {
    if (!Upload) return;
    setUpload(false)
    console.log("here")
    const [_, error] = await login(formik.values.email, formik.values.password)
    if (error) {
      setUploadFailed(error.data ? error.data : "Internal Error")
      return;
    }
    if (CaptchaSuccess == null) {
      setUploadFailed("Invalid Captcha. Please, Fill it again");
      return;
    }

    setIsLogged(true)
    if (router.pathname === '/')
      router.reload()
    else
      router.push('/')
  }, [Upload])

  /**
   * Valida los campos, revisando que las validaciones se cumplan, y tocando (marcando que ya se tocaron)
   * los campos que existen.
   * @param {} e 
   */
  const markErrors = async (e) => {
    e.preventDefault()
    setUploadFailed(null)
    const [resp] = await Promise.all([formik.validateForm]);

    for (var i in formik.values) {
      var key = i;
      formik.setFieldTouched(key, true);
    }
    formik.setErrors(resp);

    if (!formik.errors.email && !formik.errors.password)
      setUpload(true);
  }
  return (
    <>
      <Head>
        <title>Login to ABC Company</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={markErrors}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <ReCAPTCHA
              sitekey="6Lf3MPcgAAAAAH4iVvC8sFkZ2klZaO-SYr-tY-CN"
              onChange={onCaptchaCompleted}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            {UploadFailed != null ?
              <Box sx={{ my: 3 }}>
                <Typography className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1j5m5yj-MuiFormHelperText-root">
                  {UploadFailed}
                </Typography>
              </Box> : <></>
            }

          </form>
        </Container>
      </Box>

    </>
  );
};

export default Login;
