import axios from 'axios';
import * as Yup from 'yup';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize, MenuItem, CircularProgress, Modal, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ModalAlert, useStyles } from '../modals/modalAlert';
import { createActivity } from 'src/utils/activitiesAxios';
import { useRouter } from 'next/router';

/** 
 * @param {{}} props  
 * @returns React component.
 */
export const ActivityRegisterForm = (props) => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const styles = useStyles();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      /* This date is the one that returns calendar when user clicks to add
        add an activity*/
      date: props.dateselected.dateSelectedState,
      init_hour: '', 
      final_hour:'', 
      //default capacity 100 people
      capacity: '',
      cost: '',
      space: '',
      //When user creates an activity default state is active
      state: 'Activo',
      details: '',
      title: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup
        .string().required('Porfavor ingrese un título').max(500),
      details: Yup
        .string().required('Requerido'),
      capacity: Yup
        .number().integer().required('Capacidad mayor a 0'),  
      cost: Yup
        .number().required('Costo mayor a 0'),
      space: Yup
        .string().required('Espacio requerido'),
      init_hour: Yup
        .string().required('Requerido'),
      final_hour: Yup
        .string().required("Requerido")
    })
  });
  useEffect(() => {
    /**
     * This function verifies all validations and insert a news to database
     * @returns 
     */
    const onSubmit = async () => {
      if (!data) return;
      try {
        if(!(formik.values.title == "" || formik.values.date == "" || 
          formik.values.init_hour == "" || formik.values.final_hour == "" ||
          formik.values.capacity == ""  || formik.values.cost == "" ||
          formik.values.details == "" || formik.values.space== "")){
            if(formik.isValid){
              await createActivity(formik)
              setModal(true)
              formik.resetForm()
            }
            setLoading(false)
            setData(false) 
          }
        else {
          setModalError(true);
          }
        setLoading(false)
        setData(false)
        }
      catch(error){
        console.log(error)
        setModalError(true)
        setLoading(false)
        setData(false)
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
    setLoading(!loading)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Card sx={{width:'710px', height:'580px',height:'fit-contain',  margin:'auto'}}>
        <CardHeader sx={{height:'75px'}}
          subheader="Registre aquí una actividad"
          title="Actividad"
        />
        <Divider /> 
        <CardContent >
          <Grid container spacing={3} >
            <Grid item md={12} xs={12} >
              <TextField
                fullWidth
                label="Título"
                name="title"
                required
                variant="outlined"
                error={Boolean(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item md={4} xs={12}>
                <TextField
                    fullWidth
                    label="Fecha"
                    name="date"
                    required
                    disabled
                    variant="outlined"
                    error={Boolean(formik.touched.date && formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </Grid>     
            
            <Grid item md={4} xs={12} >
                <TextField sx={{width:'100%'}}
                    fullWidth
                    label="Espacio/lugar"
                    name="space"
                    required
                    variant="outlined"
                    error={Boolean(formik.touched.space && formik.errors.space)}
                    helperText={formik.touched.space && formik.errors.space}
                    value={formik.values.space}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </Grid>
            <Grid item md={4} xs={12} >
                <TextField sx={{width:'100%'}}
                    fullWidth
                    label="Precio"
                    name="cost"
                    type="number"
                    inputProps={{min:0}}
                    required
                    variant="outlined"
                    error={Boolean(formik.touched.cost && formik.errors.cost)}
                    helperText={formik.touched.cost && formik.errors.cost}
                    value={formik.values.cost}
                    onChange={(event) => {
                      let input = event.target.value
                      if(parseInt(input) >= 0){
                        formik.setFieldValue("cost", event.target.value)
                      }
                      else {
                        formik.setFieldValue("cost", "")
                      }
                    }}
                    onBlur={formik.handleBlur}
                />
            </Grid>
            
            <Grid item md={4} xs={12} > 
                <TextField
                    id="time"
                    name= "init_hour"
                    label="Hora de inicio"
                    type="time"
                    required
                    error={Boolean(formik.touched.init_hour && formik.errors.init_hour)}
                    helperText={formik.touched.init_hour && formik.errors.init_hour}
                    value={formik.values.init_hour}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{shrink: true}}
                    inputProps={{step: 300}}
                    sx={{ width: '100%' }}
                />
            </Grid>
            <Grid item md={4} xs={12} > 
                <TextField
                    id="time"
                    name= "final_hour"
                    label="Hora de finalización"
                    type="time"
                    required
                    error={Boolean(formik.touched.final_hour && formik.errors.final_hour)}
                    helperText={formik.touched.final_hour && formik.errors.final_hour}
                    value={formik.values.final_hour}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{shrink: true}}
                    inputProps={{step: 300}}
                    sx={{ width: '100%' }}
                />
            </Grid>
            <Grid item md={4} xs={12} > 
                <TextField
                    name= "capacity"
                    label="Capacidad"
                    type= "number"
                    inputProps={{min:0}}
                    required
                    error={Boolean(formik.touched.capacity && formik.errors.capacity)}
                    helperText={formik.touched.capacity && formik.errors.capacity}
                    value={formik.values.capacity} 
                    onChange={(event) => {
                      let input = event.target.value
                      if(parseInt(input) >= 0){
                        formik.setFieldValue("capacity", event.target.value)
                      }
                      else {
                        formik.setFieldValue("capacity", "")
                      }
                    }}
                    onBlur={formik.handleBlur}
                    sx={{ width: '100%' }}
                />
            </Grid>

            <Grid item md={12} xs={12} sx={{ float: 'left', width: '50%' }}>
              <TextareaAutosize
                id="details"
                maxRows={10000}
                style={formik.errors.details && formik.touched.details ? {
                  height: '7rem',
                  padding: '0.75rem',
                  borderRadius: '0.6rem',
                  width: '100%',
                  maxWidth: '100%',
                  maxHeight: '7rem',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  border: '0.8px solid #e76063', 
                  overflow:'auto',
                  resize:'vertical'
                } :
                  {
                    height: '7rem',
                    padding: '0.75rem',
                    border: '0.8px solid #E3E3E3',
                    borderRadius: '0.6rem',
                    width: '100%',
                    maxWidth: '100%',
                    maxHeight:'7rem',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '24px',
                    resize:'vertical', 
                    overflow:'auto'
                  }}
                aria-label="Detalles"
                name="details"
                placeholder='Detalles *'
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                value={formik.values.details}
              />
                {formik.errors.details && formik.touched.details ?
                    <div style={{ color: '#e76063', fontSize: '0.75rem' }}>{formik.errors.details}</div>: null}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: '0.75rem', alignItems: 'center' }} >
          <LoadingButton
            loading={loading}
            color="primary"
            variant="contained"
            onClick={(e) => { markErrors(e) && setLoading(!loading)}}>
            Registrar Actividad
          </LoadingButton>
        </Box>
      </Card>
      {(modal == true) ? 
          <Modal open={modal}
          onClose={() => {router.push('/CrearActividad') && window.location.reload()}}>
          <div className={styles.modal} style={{ width: '27rem' }}>
            <Grid sx={{ textAlign: 'center' }}>
              <Grid sx={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center', color: '#5048E5' }}>
                <StickyNote2Icon></StickyNote2Icon>
                <Typography variant='h2' sx={{ color: '#5048E5', fontSize: '1.87rem', marginBottom: '0.6rem' }}>Actividad registrada</Typography>
              </Grid>
              <Divider />
              <Typography variant='subtitle1' sx={{ marginTop: '0.6rem' }}>La actividad se pudo registrar con éxito!!! </Typography>
            </Grid>
          </div>
        </Modal> : null 
      }
      {(modalError == true) ?
        <ModalAlert
          style={{width:'29rem !important'}}
          title={"Actividad NO registrada"}
          message={"La actividad NO se pudo registrar, porfavor complete todos los campos"} modalState={modalError} 
          modalSuccess={false}
          setModalState={setModalError} /> : null
      }
    </form>
  );
}