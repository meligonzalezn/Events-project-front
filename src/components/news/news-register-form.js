import * as Yup from 'yup';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { createNews, eventsTitle, executed} from 'src/utils/newsAxios';
import { useEffect, useState } from 'react';
import { ModalAlert } from '../modals/modalAlert';
import { border } from '@mui/system';
/** 
 * @param {{}} props 
 * @returns React component.
 */
export const NewsRegisterForm = (props) => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false)
  const date = new Date()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      summary: '',
      //When user creates a news default state is active
      state: 'Activo',
      event_name: 'Evento',
      media_file: null,
      edition_date:date.getFullYear()+'-'+parseInt(date.getMonth()+1)+"-"+date.getDate() 

    },
    validationSchema: Yup.object().shape({
      title: Yup
        .string().required('Porfavor ingrese un título').max(500),
      description: Yup
        .string().required('Requerido'),
      event_name: Yup
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
      try {
        if (!data) return;
        setLoading(true);
        if (formik.isValid) {
          await createNews(formik);
          if(executed === true){
            setModal(!modal)
            setLoading(!loading);
            formik.resetForm()
        }
        setData(false);
        setLoading(false)
      }
      }catch(error){
        console.log(error)
        setModalError(true)
        setLoading(false)
      }
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
                error = {Boolean(formik.touched.event_name && formik.errors.event_name)}
                helperText={formik.touched.event_name && formik.errors.event_name}
                label="Seleccione el evento"
                name="event_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={formik.values.event_name}
                variant="outlined"
              >
                {eventsTitle.map((option, key) => (
                  <option key={key} value={option}
                  >
                    {option}
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
                id = "description"
                style={formik.errors.description && formik.touched.description ? {
                  height:'9.3rem', 
                  padding:'0.75rem', 
                  borderRadius:'0.6rem',
                  width:'100%', 
                  maxWidth:'100%', 
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight:'400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  border:'0.8px solid #e76063'
                } : 
                { height:'9.3rem', 
                  padding:'0.75rem', 
                  border:'0.8px solid #E3E3E3', 
                  borderRadius:'0.6rem',
                  width:'100%', 
                  maxWidth:'100%', 
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight:'400',
                  fontSize: '16px',
                  lineHeight: '24px' }}
                aria-label="Descripcion"
                name="description"
                placeholder='Detalles *'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                value={formik.values.description}
                variant="outlined"
              />
              {formik.errors.description && formik.touched.description ? 
                <div style={{color:'#e76063', fontSize:'0.75rem'}}>{formik.errors.description}</div>
              : null }
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
        setModalState={setModal}/> : null
      } 
      {(modalError == true) ? 
      <ModalAlert 
        title={"Noticia NO registrada"} 
        message={"La noticia NO se pudo registrar!"} modalState={modalError}
        setModalState={setModalError}/> : null
      } 
    </form>
  );
}