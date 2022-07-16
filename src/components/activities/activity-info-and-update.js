import * as Yup from 'yup';
import axios from 'axios';
import { newsDataAll, newsDataComplete, eventSelected, updateNewsData} from 'src/utils/newsAxios';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import ResponsiveDatePicker from "../date-picker/date-picker-responsive";
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize, MenuItem, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalAlert, useStyles } from '../modals/modalAlert';
import { useRouter } from 'next/router';

/**
 * Component to read information about an activity and to update if rol is Employee or Admin
 * @param {{isclient: boolean}} props
 * @returns 
 */
export const ActivityInfoAndUpdate = (props) =>{
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [titleData, setTitleData] = useState(false);
    const [spaceData, setSpaceData] = useState(false);
    const [initHourData, setInitHourData] = useState(false);
    const [finalHourData, setFinalHourData] = useState(false);
    const [detailsData, setDetailsData] = useState(false);
    const styles = useStyles();
    const router = useRouter();
    const formik = useFormik({
      initialValues: {
        date: props.dateactivity,
        init_hour: props.inithouractivity, 
        final_hour:props.finalhouractivity, 
        space: props.spaceactivity,
        state: props.stateactivity,
        details: props.detailsactivity,
        title: props.titleactivity,
      },
      validationSchema: Yup.object().shape({
        title: Yup
          .string().required('Porfavor ingrese un título').max(500),
        details: Yup
          .string().required('Requerido'),
        space: Yup
          .string().required('Espacio requerido'),
        init_hour: Yup
          .string().required('Requerido'),
        final_hour: Yup
          .string().required("Requerido"), 
        state: Yup
          .string().required("Requerido"),
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
      <fieldset disabled={(props.isclient == 0) ? null: "undefined"}>
          <Card sx={{width:'700px', margin:'auto'}}>
            {(props.isclient !== 0) ?
              <CardHeader 
                subheader="Consulta la información de la actividad"
                title="Actividad"
              />:
              <CardHeader
              subheader="Actualiza una actividad aquí"
              title="Actividad"
            />
          }
            <Divider />
            <CardContent>
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
                    value={!titleData ? props.titleActivity : formik.values.title}
                    onChange={(event) => {formik.setFieldValue("title", event.target.value) && setTitleData(true)}}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <ResponsiveDatePicker 
                    name="date" 
                    title="Fecha"  
                    onChange={(event) => formik.setFieldValue("date", event)}
                    value={formik.values.date}/>
                </Grid>    
                <Grid item md={6} xs={12} >
                    <TextField sx={{width:'100%'}}
                        fullWidth
                        label="Espacio/lugar"
                        name="space"
                        required
                        variant="outlined"
                        error={Boolean(formik.touched.space && formik.errors.space)}
                        helperText={formik.touched.space && formik.errors.space}
                        value={!spaceData ? props.spaceActivity : formik.values.space}
                        onChange={(event) => {formik.setFieldValue("space", event.target.value) && setSpaceData(true)}}
                        onBlur={formik.handleBlur}
                    />
                </Grid>
                <Grid item md={6} xs={12} > 
                    <TextField
                        id="time"
                        name= "init_hour"
                        label="Hora de inicio"
                        type="time"
                        required
                        error={Boolean(formik.touched.init_hour && formik.errors.init_hour)}
                        helperText={formik.touched.init_hour && formik.errors.init_hour}
                        value={!initHourData ? props.initHourActivity : formik.values.init_hour}
                        onChange={(event) => {formik.setFieldValue("init_hour", event.target.value) && setInitHourData(true)}}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{shrink: true}}
                        inputProps={{step: 300}}
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item md={6} xs={12} > 
                    <TextField
                        id="time"
                        name= "final_hour"
                        label="Hora de finalización"
                        type="time"
                        required
                        error={Boolean(formik.touched.final_hour && formik.errors.final_hour)}
                        helperText={formik.touched.final_hour && formik.errors.final_hour}
                        value={!finalHourData ? props.finalHourActivity : formik.values.final_hour}
                        onChange={(event) => {formik.setFieldValue("final_hour", event.target.value) && setFinalHourData(true)}}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{shrink: true}}
                        inputProps={{step: 300}}
                        sx={{ width: '100%' }}
                    />
                </Grid>
    
    
                <Grid item md={12} xs={12} sx={{ float: 'left', width: '50%' }}>
                  <TextareaAutosize
                    id="details"
                    maxRows={10000}
                    style={formik.errors.details && formik.touched.details ? {
                      height: '10rem',
                      padding: '0.75rem',
                      borderRadius: '0.6rem',
                      width: '100%',
                      maxWidth: '100%',
                      maxHeight: '10rem',
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
                        height: '10rem',
                        padding: '0.75rem',
                        border: '0.8px solid #E3E3E3',
                        borderRadius: '0.6rem',
                        width: '100%',
                        maxWidth: '100%',
                        maxHeight:'10rem',
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
                    onChange={(event) => {formik.setFieldValue("details", event.target.value) && setDetailsData(true)}}
                    onBlur={formik.handleBlur}
                    required
                    value={!detailsData ? props.detailsActivity : formik.values.details}
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
                Actualizar Actividad
              </LoadingButton>
            </Box>
          </Card>
          {(modal == true) ? 
              <Modal open={modal}
              onClose={() => {router.push('/CrearActividad') && window.location.reload()}}>
              <div className={styles.modal} style={{ width: '25rem' }}>
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
              title={"Actividad NO registrada"}
              message={"La actividad NO se pudo registrar, complete todos los campos"} modalState={modalError} 
              modalSuccess={false}
              setModalState={setModalError} /> : null
          }
        </fieldset>
      </form>
    );
}