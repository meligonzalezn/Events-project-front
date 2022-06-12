import * as Yup from 'yup';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { states } from 'src/utils/states';
import { useFormik } from 'formik';
import { createNews } from 'src/utils/newsAxios';
import { useEffect, useState } from 'react';
import { ModalAlert } from '../modals/modalAlert';
/**
 * Formulario donde se digitarán los datos del usuario a crear.
 * 
 * @param {{}} props 
 * @returns React component.
 */
export const NewsRegisterForm = (props) => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const date = new Date()
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      summary: '',
      state: 'Activo',
      media_file: null,
      edition_date:date.getFullYear()+'-'+parseInt(date.getMonth()+1)+"-"+date.getDate() 

    },
    validationSchema: Yup.object().shape({
      title: Yup
        .string().required('Porfavor ingrese un título').max(500),
      description: Yup
        .string().required('Requerido'),
      summary: Yup
        .string().required('Es necesario escribir un resumen'),
      media_file: Yup
        .object().required('Porfavor seleccione al menos 1 archivo (jpg,jpeg,mp4,mkv)')
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
        await createNews(formik);
        setLoading(!loading);
      }
      setModal(!modal)
      setData(false);
      setLoading(false);
     
    }
    
    onSubmit();
  }, [data])
  
  /**
   * This function validates fields
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
            <Grid item md={12} xs={12} sx={{float:'left', width:'50%'}}>
              <TextareaAutosize
                style={{ 
                        height:'9.3rem', 
                        padding:'0.75rem', 
                        border:'0.8px solid #E3E3E3', 
                        borderRadius:'0.6rem',
                        width:'100%', 
                        maxWidth:'100%', 
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight:'400',
                        fontSize: '16px',
                        lineHeight: '24px'}}
                aria-label="Descripcion"
                name="description"
                placeholder='Detalles *'
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap:'0.75rem', alignItems:'center' }} >
          <div>
            <input 
              style={{display:'none'}}
              id="media_file"
              type="file"
              accept='.png, .jpg, jpeg, .mp4, .mkv'
              name="media_file"
              required
              onChange={(event) => formik.setFieldValue("media_file", event.target.files[0])}
              >
            </input>
            <label htmlFor="media_file" 
              style={{color:'#5048E5', fontFamily: 'Inter', fontStyle: 'normal',
                    fontWeight: '600',fontSize: '0.87rem',lineHeight: '1.5rem', cursor:'pointer'}}>
              Subir archivo
            </label>
          </div>
          <LoadingButton 
            loading={loading} 
            color="primary" 
            variant="contained" 
            onClick={(e) => { markErrors(e)}}>
            Registrar Noticia
          </LoadingButton>
        </Box>
      </Card>
      {(modal == true) ? <ModalAlert 
        title={"Noticia registrada"} 
        message={"La noticia fue registrada exitosamente!"} modalState={modal}
        setModalState={setModal}/> : 
        <ModalAlert 
        title={"Noticia registrada"} 
        message={"La noticia fue registrada exitosamente!"} modalState={modal}
        setModalState={setModal}/>
      } 
    </form>
  );
}