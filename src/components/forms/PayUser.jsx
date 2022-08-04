import * as Yup from 'yup';
import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

/**
 * 
 * 
 * @param {{setValidStep: function, validateData: boolean,
 *          setValidateData: function}} props 
 * @returns React component.
 */
export default function PayUser(props) {
  const [upload, setUpload] = useState(false);
  const formik = useFormik({
    initialValues: {
      Name: '',
      LastName: '',
      Email: '',
      Phone: '',
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
        .number().positive('No puede ser un número negativo')
    })
  });

  useEffect(() => {
    /**
   * Verifica si se cumplen las validaciones establecidas e inserta al nuevo usuario en la BD.
   */
    const validateAndUploadData = async () => {
      if (!upload) return;

      if (formik.isValid) {
        props.setValidStep(true);
      }

      setUpload(false);
    }

    validateAndUploadData();
  }, [upload])

  useEffect(() => {
    /**
   * Valida los campos, revisando que las validaciones se cumplan, y tocando (marcando que ya se tocaron)
   * los campos que existen. 
   */
    const markErrors = async () => {
      if (!props.validateData) return;

      const [resp] = await Promise.all([formik.validateForm()]);

      for (var i in formik.values) {
        var key = i;
        formik.setFieldTouched(key, true);
      }

      setUpload(true);
      props.setValidateData(false);
    }

    markErrors();
  }, [props.validateData]);

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Digite sus datos"
          title="Datos Personales"
        />

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

          </Grid>
        </CardContent>
      </Card>
    </form>
  );
}