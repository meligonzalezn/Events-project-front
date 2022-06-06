import * as Yup from 'yup';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { roles } from 'src/utils/roles';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

/**
 * Formulario donde se digitarán los datos del usuario a crear.
 * 
 * @param {{}} props 
 * @returns React component.
 */
export default function CreateUserForm(props) {
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
    validationSchema: Yup.object({
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

  /**
   * Verifica si se cumplen las validaciones establecidas.
   * @returns Boolean True si las validaciones pasaron, false de lo contrario.
   */
  const validateData = () => {
    if (confirmPass.isValid && formik.isValid) return true;
    return false;
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
          <Button color="primary" variant="contained" onClick={(e) => {
            if (validateData()) router.push('/'); // TODO Registrar Usuario en la Base de Datos.
          }}>
            Registrar Usuario
          </Button>
        </Box>
      </Card>
    </form>
  );
}