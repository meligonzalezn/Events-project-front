import * as Yup from 'yup';
import { Box, Button ,Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
//import { roles } from 'src/utils/roles';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
//import { createUser } from 'src/utils/userAxios';
import { useEffect, useState } from 'react';
import ResponsiveDatePicker from "../date-picker/date-picker-responsive";



const states = [
    {
      value: "active",
      label: "Activo",
    },
    {
      value: "inactive",
      label: "Inactivo",
    },
  ];
  
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
      ];



/**
 * Formulario donde se digitarán los datos del usuario a crear.
 * 
 * @param {{}} props 
 * @returns React component.
 */
//export default function EventDetails(props) {
export const EventDetails = (props) => {
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      start_date: new Date(),
      finish_date: new Date(),
      enrollment_price: 0,
      details: '',
      state: 'Activo',
      image_file: ''
    },
    validationSchema: Yup.object().shape({
      title: Yup
        .string().required('Es necesario digitar un título').max(100),
      start_date: Yup
      .string().required('Es necesario seleccionar una fecha').max(50),
      finish_date: Yup
      .string().required('Es necesario seleccionar una fecha').max(50),
      enrollment_price: Yup
        .number().required('Es necesario digitar un precio').positive('No puede ser un número negativo'),
      details: Yup
      .string().max(500)
    })
  });

  // const confirmPass = useFormik({
  //   initialValues: {
  //     password: ''
  //   },
  //   validationSchema: Yup.object({
  //     password: Yup
  //       .string().max(255).required('Digite su contraseña').oneOf([formik.values.password], 'La contraseña no coincide')
  //   })
  // });

  useEffect(() => {
    /**
   * Verifica si se cumplen las validaciones establecidas e inserta al nuevo usuario en la BD.
   */
    const validateAndUploadData = async () => {
      if (!upload) return;
      setLoading(true);

      if ( formik.isValid ) {
        //await createUser(formik);
        console.log("submitted succesfully", "formik_values: ", formik.values);
        setLoading(!loading);
        //router.push('/'); // TODO change to Usuarios and Display notification showing that the operation was succesful.
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
    const [resp] = await Promise.all([formik.validateForm]);

    for (var i in formik.values) {
      var key = i;
      formik.setFieldTouched(key, true);
    }

    // for (var i in confirmPass.values) {
    //   var key = i;
    //   confirmPass.setFieldTouched(key, true);
    // }

    formik.setErrors(resp);
    //confirmPass.setErrors(respc);
    setUpload(true);
  }

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Card>
        <CardHeader title="Evento" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                error={Boolean(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                fullWidth
                label="Estado"
                name="state"
                required
                select
                SelectProps={{ native: true }}
                onChange={formik.handleChange}
                value={formik.values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={3.7} xs={12}>
              <ResponsiveDatePicker name="start_date" title="Fecha de inicio" onChange={(e) => {formik.setFieldValue('start_date', e)}}
                value={formik.values.start_date} />
            </Grid>
            <Grid item md={3.7} xs={12}>
              <ResponsiveDatePicker name="finish_date" title="Fecha de finalización"  onChange={(e) => {formik.setFieldValue('finish_date', e)}}
                value={formik.values.finish_date}/>
            </Grid>
            <Grid item md={4.5} xs={12}>
              <TextField
                fullWidth
                label="Precio de inscripción"
                name="enrollment_price"
                required
                error={Boolean(formik.touched.enrollment_price && formik.errors.enrollment_price)}
                helperText={formik.touched.enrollment_price && formik.errors.enrollment_price}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.enrollment_price}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Detalles"
                multiline
                rows={4}
                name="details"
                error={Boolean(formik.touched.details && formik.errors.details)}
                helperText={formik.touched.details && formik.errors.details}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
              />
            </Grid>
            {/* <Grid item md={12} xs={12}>
              <Image cloudName="dyytwkgar"  publicId ="https://res.cloudinary.com/dyytwkgar/image/upload/v1654811261/hcokwzqk7i2hia76qzgv.png"
              />
            </Grid> */}

          </Grid>
        </CardContent>
        <Divider />
      
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <div>
            <input 
              style={{display:'none'}}
              id = "image_file"
              type="file"
              accept='.png, .jpg, jpeg'
              name="image_file"
              required
              onChange={(e) => formik.setFieldValue("image_file", e.target.files[0])}
              >
            </input>
            <label htmlFor="image_file" 
              style={{color:'#5048E5', fontFamily: 'Inter', fontStyle: 'normal',
                    fontWeight: '600',fontSize: '0.87rem',lineHeight: '1.5rem', cursor:'pointer'}}>
              Subir imagen
            </label>
          </div>
            <Button color="primary" variant="contained" onClick={(e) => {
            markErrors(e)}}>
              Guardar
            </Button>
        </Box>
     
      </Card>
    </form>
  );
}