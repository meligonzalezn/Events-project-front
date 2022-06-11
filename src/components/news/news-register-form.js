import * as Yup from 'yup';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { states } from 'src/utils/states';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { createNews } from 'src/utils/newsAxios';
import { useEffect, useRef, useState } from 'react';

/**
 * Formulario donde se digitarán los datos del usuario a crear.
 * 
 * @param {{}} props 
 * @returns React component.
 */
export const NewsRegisterForm = (props) => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = new Date()
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      summary: '',
      state: 'Activo',
      media_file: null,
      edition_date: date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDay(), 
    },
    validationSchema: Yup.object().shape({
      title: Yup
        .string().required('Porfavor ingrese un título').max(500),
      description: Yup
        .string().required('Porfavor digite una descripción'),
      summary: Yup
        .string().required('Es necesario escribir un resumen'),
      media_file: Yup
        .object().required('Porfavor seleccione al menos 1 archivo (imagen o video)')
    })
  });

  useEffect(() => {
    /**
     * This function verifies all validations and insert a news to database
     * @returns 
     */
    const onSubmit = async () => {
      if (!data) return;
      setLoading(true);
      if (formik.isValid) {
        console.log("Su mamá en tanga",formik.values)
        await createNews(formik);
        setLoading(!loading);
        //here we need a modal that I'll do later
        router.push('/');
      }
      setData(false);
      setLoading(false);
    }
    onSubmit();
  }, [data])
  
  /**
   * Valida los campos, revisando que las validaciones se cumplan, y tocando (marcando que ya se tocaron)
   * los campos que existen.
   * @param {} e
   */
   const markErrors = async (e) => {
    const [resp] = await Promise.all([formik.validateForm]);

    for (var i in formik.values) {
      var key = i;
      formik.setFieldTouched(key, true);
    }
    formik.setErrors(resp);
    setData(true);
  }

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Registre aquí una noticia"
          title="Noticia"
        />
        <Divider />

        <CardContent>
          <Grid container spacing={3} >
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                label="Título"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.title}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Seleccione un estado"
                name="state"
                onChange={formik.handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={formik.values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item md={12} xs={12} >
              <TextField
                fullWidth
                error={Boolean(formik.touched.summary && formik.errors.summary)}
                helperText={formik.touched.summary && formik.errors.summary}
                label="Resumen"
                name="summary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                value={formik.values.summary}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12} >
              <TextareaAutosize
                aria-label="Descripcion"
                name="description"
                placeholder='Descripción'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                value={formik.values.description}
                variant="outlined"
              />
            </Grid>
          </Grid>
          
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >
          <label>
            <input 
              id="media_file"
              type="file"
              name="media_file"
              onChange={(event) => 
                formik.setFieldValue("media_file", event.target.files[0]) && 
                console.log("holas "+event.target.files[0] + event.target.files[0].name)}
              >
            </input>
          </label>
          <LoadingButton 
            loading={loading} 
            color="primary" 
            variant="contained" 
            onClick={(e) => { markErrors(e)}}>
            Registrar Noticia
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
}