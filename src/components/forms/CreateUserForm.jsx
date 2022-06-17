import * as Yup from 'yup';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
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
export default function UserForm(props) {
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() =>console.log("XD"), [])

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      Name: props.Name ? props.Name : '',
      LastName: props.LastName ? props.LastName : '',
      Email: props.Email ? props.Email : '',
      Phone: props.Phone ? props.Phone : '',
      rol: props.Role ? props.Role : 'Administrador',
      Password: props.Password ? props.Password : '',
      BeforePassword: props.Password ? props.Password : '',
      id: props.id
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
    /**
   * Verifica si se cumplen las validaciones establecidas e inserta al nuevo usuario en la BD.
   */
    const validateAndUploadData = async () => {
      if (!upload) return;
      setLoading(true);

      if (confirmPass.isValid && formik.isValid) {
        await props.finalFunction(formik)
        setLoading(!loading);
        router.push('/Usuarios'); // TODO change to Usuarios and Display notification showing that the operation was succesful.
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
        {console.log("props", props)}

        <Divider />

        <CardContent>
          <Grid container spacing={3} >
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.Name && formik.errors.Name)}
                helperText={formik.touched.Name && formik.errors.Name}
                label="Nombres"
                name="Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.Name}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.LastName && formik.errors.LastName)}
                helperText={formik.touched.LastName && formik.errors.LastName}
                label="Apellidos"
                name="LastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                value={formik.values.LastName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                error={Boolean(formik.touched.Email && formik.errors.Email)}
                helperText={formik.touched.Email && formik.errors.Email}
                fullWidth
                label="Email"
                name="Email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.Email}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.Phone && formik.errors.Phone)}
                helperText={formik.touched.Phone && formik.errors.Phone}
                label="Número de teléfono"
                name="Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                value={formik.values.Phone}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.Password && formik.errors.Password)}
                helperText={formik.touched.Password && formik.errors.Password}
                label="Contraseña"
                name="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                type="password"
                value={formik.values.Password}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                error={Boolean(confirmPass.touched.Password && confirmPass.errors.Password)}
                fullWidth
                label="Confirme contraseña"
                name="Password"
                onChange={confirmPass.handleChange}
                onBlur={confirmPass.handleBlur}
                required
                helperText={confirmPass.touched.Password && confirmPass.errors.Password}
                type="password"
                value={confirmPass.values.Password}
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
            {`${props.type} usuario`}
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
}