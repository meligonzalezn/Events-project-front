import * as Yup from 'yup';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { roles } from 'src/utils/roles';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { createUser } from 'src/utils/userAxios';
import { useEffect, useState } from 'react';

/**
 * Formulario donde se digitarán los datos del usuario a crear.
 * 
 * @param {{}} props 
 * @returns React component.
 */
export default function CreateUserForm(props) {
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      rol: 'Administrador',
      password: ''
    },
    validationSchema: Yup.object().shape({
      firstName: Yup
        .string().required('Es necesario digitar sus nombres').max(50),
      lastName: Yup
        .string().required('Es necesario digitar sus apellidos').max(50),
      email: Yup
        .string().email('Debe ser un correo válido').max(100).min(5)
        .required('Es necesario digitar un email'),
      phone: Yup
        .number().positive('No puede ser un número negativo'),
      password: Yup
        .string().max(255).required('Digite su contraseña').min(8)
    })
  });

  const confirmPass = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup
        .string().max(255).required('Digite su contraseña').oneOf([formik.values.password], 'La contraseña no coincide')
    })
  });

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
        router.push('/'); // TODO change to Usuarios and Display notification showing that the operation was succesful.
      }

      setLoading(false);
      setUpload(false);
    }

    validateAndUploadData();
  }, [formik.errors, confirmPass.errors])

  /**
   * Valida los campos, revisando que las validaciones se cumplan, y tocando (marcando que ya se tocaron)
   * los campos que existen.
   * @param {} e 
   */
  const markErrors = async (e) => {
    const [resp, respc] = await Promise.all([formik.validateForm, confirmPass.validateForm]);

    for (var i in formik.values) {
      var key = i;
      formik.setFieldTouched(key, true);
    }

    for (var i in confirmPass.values) {
      var key = i;
      confirmPass.setFieldTouched(key, true);
    }

    formik.setErrors(resp);
    confirmPass.setErrors(respc);
    setUpload(true);
  }

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Registre al usuario que desea"
          title="Usuario"
        />

        <Divider />

        <CardContent>
          <Grid container spacing={3} >
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="Nombres"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Apellidos"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                value={formik.values.lastName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                label="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                label="Número de teléfono"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                value={formik.values.phone}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                label="Contraseña"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                error={Boolean(confirmPass.touched.password && confirmPass.errors.password)}
                fullWidth
                label="Confirme contraseña"
                name="password"
                onChange={confirmPass.handleChange}
                onBlur={confirmPass.handleBlur}
                required
                helperText={confirmPass.touched.password && confirmPass.errors.password}
                type="password"
                value={confirmPass.values.password}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Seleccione Rol"
                name="rol"
                onChange={formik.handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={formik.values.rol}
                variant="outlined"
              >
                {roles.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >
          <LoadingButton loading={loading} color="primary" variant="contained" onClick={(e) => {
            markErrors(e)
          }}>
            Registrar Usuario
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
}