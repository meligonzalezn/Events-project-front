import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { createUser } from 'src/utils/userAxios';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

/**
 * 
 * @param {{userImage: file}} props 
 * @returns 
 */
export default function ViewSignUp(props) {
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      Name: '',
      LastName: '',
      Email: '',
      Phone: '',
      Role: 'Cliente',
      Password: '',
      Image: props.userImage
    },
    validationSchema: Yup.object().shape({
      Name: Yup
        .string().required('Es necesario digitar sus nombres').max(50),
      LastName: Yup
        .string().required('Es necesario digitar sus apellidos').max(50),
      Email: Yup
        .string().email('Debe ser un correo válido').max(100).min(5)
        .required('Es necesario digitar un Email'),
      Phone: Yup
        .number().positive('No puede ser un número negativo'),
      Password: Yup
        .string().max(255).required('Digite su contraseña').min(8)
    })
  });

  const confirmPass = useFormik({
    initialValues: {
      Password: ''
    },
    validationSchema: Yup.object({
      Password: Yup
        .string().max(255).required('Digite su contraseña').oneOf([formik.values.Password], 'La contraseña no coincide')
    })
  });

  useEffect(() => {
    formik.setFieldValue('Image', props.userImage);
  }, [props.userImage])

  useEffect(() => {
    /**
   * Verifica si se cumplen las validaciones establecidas e inserta al nuevo usuario en la BD.
   */
    const validateAndUploadData = async () => {
      if (!upload) return;
      setLoading(true);

      if (confirmPass.isValid && formik.isValid) {
        await createUser(formik);
        setLoading(!loading);
        router.push('/'); // TODO Display notification showing that the operation was succesful.
      }

      setUpload(false);
      setLoading(false);
    }

    validateAndUploadData();
  }, [upload])

  /**
   * Valida los campos, revisando que las validaciones se cumplan, y tocando (marcando que ya se tocaron)
   * los campos que existen.
   * @param {} e 
   */
  const markErrors = async (e) => {
    const [resp, respc] = await Promise.all([formik.validateForm(), confirmPass.validateForm()]);

    for (var i in formik.values) {
      var key = i;
      formik.setFieldTouched(key, true);
    }

    for (var i in confirmPass.values) {
      var key = i;
      confirmPass.setFieldTouched(key, true);
    }

    setUpload(true);
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(formik.touched.Name && formik.errors.Name)}
          fullWidth
          helperText={formik.touched.Name && formik.errors.Name}
          label="Nombres"
          margin="normal"
          name="Name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.Name}
          variant="outlined"
        />

        <TextField
          error={Boolean(formik.touched.LastName && formik.errors.LastName)}
          fullWidth
          helperText={formik.touched.LastName && formik.errors.LastName}
          label="Apellidos"
          margin="normal"
          name="LastName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.LastName}
          variant="outlined"
        />

        <TextField
          error={Boolean(formik.touched.Email && formik.errors.Email)}
          fullWidth
          helperText={formik.touched.Email && formik.errors.Email}
          label="Email"
          margin="normal"
          name="Email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.Email}
          variant="outlined"
        />

        <TextField
          error={Boolean(formik.touched.Password && formik.errors.Password)}
          fullWidth
          helperText={formik.touched.Password && formik.errors.Password}
          label="Contraseña"
          margin="normal"
          name="Password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.Password}
          variant="outlined"
        />

        <TextField
          error={Boolean(confirmPass.touched.Password && confirmPass.errors.Password)}
          fullWidth
          helperText={confirmPass.touched.Password && confirmPass.errors.Password}
          label="Confirmar Contraseña"
          margin="normal"
          name="Password"
          onBlur={confirmPass.handleBlur}
          onChange={confirmPass.handleChange}
          type="password"
          value={confirmPass.values.Password}
          variant="outlined"
        />

        <Box sx={{ py: 2 }}>
          <LoadingButton loading={loading} color="primary" variant="contained" onClick={markErrors}
            fullWidth size='large'>
            Registrarse
          </LoadingButton>
        </Box>

        <Typography color="textSecondary" variant="body2" >
          Ya tienes una cuenta?
          {' '}
          <NextLink href="/login" passHref >
            <Link variant="subtitle2" underline="hover" >
              Ingresa aquí
            </Link>
          </NextLink>
        </Typography>
      </form>
    </>
  );
};
