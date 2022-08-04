import * as Yup from 'yup';
import { Button, Modal } from '@mui/material';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import ResponsiveDatePicker from "../date-picker/date-picker-responsive";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize, MenuItem, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalAlert, useStyles } from '../modals/modalAlert';
import { useRouter } from 'next/router';
import { checkEnrolledStatus, unenroll, updateActivity } from 'src/utils/activitiesAxios';
import axios from 'axios';


/**
 * Component to read information about an activity and to update if rol is Employee or Admin
 * @param {{isclient: boolean}} props
 * @returns 
 */
export const ActivityInfoAndUpdate = (props) => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [titleData, setTitleData] = useState(false);
  const [capacityData, setCapacityData] = useState(false);
  const [spaceData, setSpaceData] = useState(false);
  const [stateData, setStateData] = useState(false);
  const [initHourData, setInitHourData] = useState(false);
  const [finalHourData, setFinalHourData] = useState(false);
  const [dateData, setDateData] = useState(false);
  const [detailsData, setDetailsData] = useState(false);
  const [costData, setCostData] = useState(false);
  const [enrolled, setEnrolled] = useState(null);

  const states = ['Activo', 'Inactivo']
  const styles = useStyles();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: props.idactivity,
      date: props.dateactivity,
      init_hour: props.inithouractivity,
      final_hour: props.finalhouractivity,
      capacity: props.capacityactivity,
      cost: props.costactivity,
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
      capacity: Yup
        .number().integer().required('Capacidad mayor a 0'),
      cost: Yup
        .number().required('Costo mayor a 0'),
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
        if (!(formik.values.title == "" || formik.values.date == "" ||
          formik.values.init_hour == "" || formik.values.final_hour == "" ||
          formik.values.capacity == "" || formik.values.cost == "" ||
          formik.values.details == "" || formik.values.space == "")) {
          if (formik.isValid) {
            await updateActivity(formik)
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
      catch (error) {
        console.log(error)
        setModalError(true)
        setLoading(false)
        setData(false)
      }
    }
    onSubmit();
  }, [data])

  useEffect(() => {
    const validateEnrollStatus = async () => {
      if (props.isclient == 0) return;

      const resp = await checkEnrolledStatus(formik.values.id);
      const enrolledStatus = resp[0];

      if (enrolledStatus == 'Not Enrolled') setEnrolled(false);
      else setEnrolled(true);
    }

    validateEnrollStatus();
  }, [])

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

  /**
   * Saves the activity information in localStorage and redirects the user to payment
   * tab to complete the sign up process.
   * @param {*} e 
   */
  const handleSignUp = async (e) => {
    if (!enrolled) {
      localStorage.setItem("actividad", JSON.stringify(formik.values));
      router.push("Pago/[id]/Pagar", `Pago/${formik.values.title}/Pagar`);
    } else {
      let data = JSON.parse(JSON.stringify(formik.values));
      data.date = new Date(data.date);
      data.capacity++;
      const metadata = { values: data };

      const resp1 = await unenroll(formik.initialValues.id);
      const resp2 = await updateActivity(metadata);
      router.reload();
    }
  }


  const displayRespectiveButton = () => {
    if (props.isclient == 0) return (
      <>
        <LoadingButton
          loading={loading}
          color="primary"
          variant="contained"
          onClick={(e) => router.push('/ParticipantesActividad') && localStorage.setItem('idActivity', props.idactivity)}>
          Participantes 
        </LoadingButton>
        <LoadingButton
          loading={loading}
          color="primary"
          variant="contained"
          onClick={(e) => { markErrors(e) && setLoading(!loading) }}>
          Actualizar Actividad
        </LoadingButton>

      </>
    )
    return (
      <>
        <LoadingButton
          loading={enrolled == null ? true : false}
          color="primary"
          variant="contained"
          onClick={(e) => { handleSignUp(e) }}>
          {enrolled == null ? "Cargando Status" : enrolled ? "Cancelar Inscripción" : "Inscribirse"}
        </LoadingButton>
      </>
    )
  }

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...props}
      style={{ borderRadius: '0.6rem' }}
    >
      <fieldset style={{ borderRadius: '0.6rem', border: 0 }} disabled={(props.isclient == 0) ? null : "undefined"}>
        <Card sx={{ width: '710px', height: '580px', height: 'fit-contain', margin: 'auto' }}>
          {(props.isclient !== 0) ?
            <CardHeader sx={{ height: '75px' }}
              subheader="Consulta la información de la actividad"
              title="Actividad"
            /> :
            <CardHeader sx={{ height: '75px' }}
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
                  value={!titleData ? props.titleactivity : formik.values.title}
                  onChange={(event) => { formik.setFieldValue("title", event.target.value) && setTitleData(true) }}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item md={(props.isclient == 0) ? 4 : 6} xs={12}>
                {(props.isclient == 0) ?
                  <ResponsiveDatePicker
                    name="date"
                    title="Fecha"
                    onChange={(event) => formik.setFieldValue("date", event) && setDateData(true)}
                    value={!dateData ? props.dateactivity : formik.values.date} /> :
                  <TextField
                    fullWidth
                    label="Fecha"
                    name="date"
                    required
                    disabled
                    variant="outlined"
                    error={Boolean(formik.touched.date && formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    value={formik.values.date.getDate() + '/' + parseInt(formik.values.date.getMonth() + 1) + "/" + formik.values.date.getFullYear()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              </Grid>
              <Grid item md={(props.isclient == 0) ? 4 : 6} xs={12} >
                <TextField sx={{ width: '100%' }}
                  fullWidth
                  label="Espacio/lugar"
                  name="space"
                  required
                  variant="outlined"
                  error={Boolean(formik.touched.space && formik.errors.space)}
                  helperText={formik.touched.space && formik.errors.space}
                  value={!spaceData ? props.spaceactivity : formik.values.space}
                  onChange={(event) => { formik.setFieldValue("space", event.target.value) && setSpaceData(true) }}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              {(props.isclient == 0) ?
                <Grid item md={4} xs={12} >
                  <TextField
                    fullWidth
                    id="state"
                    name="state"
                    label="Seleccione el estado *"
                    select
                    error={Boolean(formik.touched.state && formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    value={!stateData ? props.stateactivity : formik.values.state}
                    onChange={(event) => formik.setFieldValue("state", event.target.value) && setStateData(true)}
                    variant="outlined"
                  >
                    {states.map((option, key) => (
                      <MenuItem value={option} key={key}>{option}</MenuItem>
                    ))}
                  </TextField>
                </Grid> : null
              }
              <Grid item md={3} xs={12} >
                <TextField
                  id="time"
                  name="init_hour"
                  label="Hora de inicio"
                  type="time"
                  required
                  error={Boolean(formik.touched.init_hour && formik.errors.init_hour)}
                  helperText={formik.touched.init_hour && formik.errors.init_hour}
                  value={!initHourData ? props.inithouractivity : formik.values.init_hour}
                  onChange={(event) => { formik.setFieldValue("init_hour", event.target.value) && setInitHourData(true) }}
                  onBlur={formik.handleBlur}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item md={3} xs={12} >
                <TextField
                  id="time"
                  name="final_hour"
                  label="Hora de finalización"
                  type="time"
                  required
                  error={Boolean(formik.touched.final_hour && formik.errors.final_hour)}
                  helperText={formik.touched.final_hour && formik.errors.final_hour}
                  value={!finalHourData ? props.finalhouractivity : formik.values.final_hour}
                  onChange={(event) => { formik.setFieldValue("final_hour", event.target.value) && setFinalHourData(true) }}
                  onBlur={formik.handleBlur}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item md={3} xs={12} >
                <TextField
                  name="capacity"
                  label="Capacidad"
                  type="number"
                  inputProps={{ min: 0 }}
                  required
                  error={Boolean(formik.touched.capacity && formik.errors.capacity)}
                  helperText={formik.touched.capacity && formik.errors.capacity}
                  value={!capacityData ? props.capacityactivity : formik.values.capacity}
                  onChange={(event) => {
                    let input = event.target.value
                    if (parseInt(input) >= 0) {
                      formik.setFieldValue("capacity", event.target.value) && setCapacityData(true)
                    }
                    else {
                      formik.setFieldValue("capacity", "") && setCapacityData(true)
                    }
                  }}
                  onBlur={formik.handleBlur}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item md={3} xs={12} >
                <TextField
                  name="cost"
                  label="Precio"
                  type="number"
                  inputProps={{ min: 0 }}
                  required
                  error={Boolean(formik.touched.cost && formik.errors.cost)}
                  helperText={formik.touched.cost && formik.errors.cost}
                  value={!costData ? props.costactivity : formik.values.cost}
                  onChange={(event) => {
                    let input = event.target.value
                    if (parseInt(input) >= 0) {
                      formik.setFieldValue("cost", event.target.value) && setCostData(true)
                    }
                    else {
                      formik.setFieldValue("cost", "") && setCostData(true)
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
                    overflow: 'auto',
                    resize: 'vertical'
                  } :
                    {
                      height: '7rem',
                      padding: '0.75rem',
                      border: '0.8px solid #E3E3E3',
                      borderRadius: '0.6rem',
                      width: '100%',
                      maxWidth: '100%',
                      maxHeight: '7rem',
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '16px',
                      lineHeight: '24px',
                      resize: 'vertical',
                      overflow: 'auto'
                    }}
                  aria-label="Detalles"
                  name="details"
                  placeholder='Detalles *'
                  variant="outlined"
                  onChange={(event) => { formik.setFieldValue("details", event.target.value) && setDetailsData(true) }}
                  onBlur={formik.handleBlur}
                  required
                  value={!detailsData ? props.detailsactivity : formik.values.details}
                />
                {formik.errors.details && formik.touched.details ?
                  <div style={{ color: '#e76063', fontSize: '0.75rem' }}>{formik.errors.details}</div> : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {(modal == true) ?
          <Modal open={modal}
            onClose={() => { router.push('/CrearActividad') && window.location.reload() }}>
            <div className={styles.modal} style={{ width: '27rem' }}>
              <Grid sx={{ textAlign: 'center' }}>
                <Grid sx={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center', color: '#5048E5' }}>
                  <StickyNote2Icon></StickyNote2Icon>
                  <Typography variant='h2' sx={{ color: '#5048E5', fontSize: '1.87rem', marginBottom: '0.6rem' }}>Actividad actualizada</Typography>
                </Grid>
                <Divider />
                <Typography variant='subtitle1' sx={{ marginTop: '0.6rem' }}>La actividad se pudo actualizar con éxito!!! </Typography>
              </Grid>
            </div>
          </Modal> : null
        }
        {(modalError == true) ?
          <ModalAlert
            style={{ width: '29rem !important' }}
            title={"Actividad NO actualizada"}
            message={"La actividad NO se pudo actualizar, porfavor complete todos los campos"} modalState={modalError}
            modalSuccess={false}
            setModalState={setModalError} /> : null
        }
      </fieldset>
      <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: '0.75rem', alignItems: 'center' }} >
            {displayRespectiveButton()}
        </Box>
    </form>
  );
}