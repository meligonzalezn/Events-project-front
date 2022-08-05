import * as Yup from 'yup';
import axios from 'axios';
import { newsDataAll, newsDataComplete, eventSelected, updateNewsData } from 'src/utils/newsAxios';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import ResponsiveDatePicker from "../date-picker/date-picker-responsive";
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize, MenuItem, Link, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { NewsDropdown } from './news-dropdown';
import { ModalAlert } from '../modals/modalAlert';
import BackButton from '../BackButton';

/** 
 * @param {{}} props  
 * @returns React component.
 */
export const NewsUpdateForm = (props) => {
  const [data, setData] = useState(false);
  const [newsName, setNewsName] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [newsTitle, setNewsTitle] = useState(false);
  const [newsDescription, setNewsDescription] = useState(false);
  const [newsSummary, setNewsSummary] = useState(false);
  const [newsState, setNewsState] = useState(false);
  const [nameEvent, setNameEvent] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [eventsDataState, setEventsDataState] = useState();
  const states = ['Activo', 'Inactivo']
  const date = new Date()

  const validationSchema = Yup.object({
    title: Yup
      .string().required('Porfavor ingrese un título').max(500),
    description: Yup
      .string().required('Requerido'),
    event_name: Yup
      .string().required('Requerido'),
    summary: Yup
      .string().required('Es necesario escribir un resumen'),
    media_file: Yup
      .object().required('Porfavor seleccione al menos 1 archivo (jpg,jpeg,mp4,mkv)'),
    state: Yup
      .string().required("Requerido"),
    finish_date: Yup
      .string().required("Requerido")
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: newsDataComplete.id,
      title: newsDataComplete.Title,
      description: newsDataComplete.Description,
      summary: newsDataComplete.Summary,
      state: newsDataComplete.State,
      event_name: eventSelected,
      media_file: newsDataComplete.Media_file,
      edition_date: date.getFullYear() + '-' + parseInt(date.getMonth() + 1) + "-" + date.getDate(),
      finish_date: newsDataComplete.Finish_date
    },
    validationSchema: validationSchema,
  });
  /**
   * This function executes petition to get the data of the news that user wants to update
   * and set state to display form.
   */
  const executeFunction = async () => {
    try {
      await newsDataAll(newsName)
      setDisplayForm(true)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    /**
    * We get the events registered in database
    * @param {} 
    */
    const eventsData = async () => {
      try {
        const eventsRequest = await axios.get("https://abc-app-univalle.herokuapp.com/Events/")
        setEventsDataState(eventsRequest.data)
      }
      catch (error) {
        console.log(error)
        return [null, error]
      }
    }

    /**
     * This function verifies all validations and insert a news to database
     * @returns 
     */
    const onSubmit = async () => {
      if (!data) return;
      try {
        if (formik.isValid) {
          await updateNewsData(formik)
          setModal(true)
          formik.resetForm()
        }
        setData(false);
        setLoading(false)
        setModal(!modal)
        setDisplayForm(false);
        setLoadingSearch(false)
        setNewsName('')
      }
      catch (error) {
        console.log(error)
        setModalError(true)
        setLoading(false)
        setData(false)
      }
    }
    onSubmit();
    eventsData()
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
      {...props}>
      <Card sx={{ width: '700px', margin: 'auto' }}>
        <Box
          sx={{
            alignItems: 'center', display: 'flex', justifyContent: 'space-between',
            flexWrap: 'wrap', m: -1,
          }}>
          <CardHeader
            subheader="Actualice la noticia que desee aquí"
            title="Noticia"
          />
          <Box sx={{ pr: 2 }}>
            <BackButton route='/Noticias' />
          </Box>
        </Box>
        <Divider />
        {!displayForm ?
          <CardContent>
            <Grid container spacing={3} >
              <NewsDropdown newsNameState={newsName} setNewsNameState={setNewsName}></NewsDropdown>
              <Grid item md={12} xs={12} >
                <LoadingButton
                  loading={loadingSearch}
                  color="primary"
                  variant="contained"
                  disabled={newsName === ''}
                  onClick={() => executeFunction() && setLoadingSearch(!loadingSearch)}>
                  Buscar
                </LoadingButton>
              </Grid>
            </Grid>
          </CardContent> :
          <div>
            <CardContent>
              <Grid container spacing={3} >
                <Grid item md={12} xs={12} >
                  <TextField
                    sx={{ marginTop: '0.9rem' }}
                    fullWidth
                    error={Boolean(formik.touched.title && formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    label="Título"
                    name="title"
                    onBlur={formik.handleBlur}
                    onChange={(event) => { formik.setFieldValue("title", event.target.value) && setNewsTitle(true) }}
                    required
                    value={!newsTitle ? newsDataComplete.Title : formik.values.title}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12} >
                  <TextField
                    sx={{ marginTop: '0.9rem' }}
                    fullWidth
                    id="event_name"
                    name="event_name"
                    label="Seleccione el evento *"
                    select
                    error={Boolean(formik.touched.event_name && formik.errors.event_name)}
                    helperText={formik.touched.event_name && formik.errors.event_name}
                    value={!nameEvent ? eventSelected : formik.values.event_name}
                    onChange={(event) => formik.setFieldValue("event_name", event.target.value) && setNameEvent(true)}
                    variant="outlined"

                  >
                    {eventsDataState ?
                      eventsDataState.map((option, key) => (<MenuItem value={option.Title} key={key}>{option.Title}</MenuItem>)) :
                      <MenuItem disabled value="default" key="default"><CircularProgress sx={{ margin: 'auto' }}></CircularProgress> </MenuItem>
                    }
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12} sx={{ marginTop: '15px' }}>
                  <ResponsiveDatePicker
                    name="finish_date"
                    title="Fecha límite"
                    onChange={(event) => formik.setFieldValue("finish_date", event)}
                    value={formik.values.finish_date} />
                </Grid>
                <Grid item md={6} xs={12} >
                  <TextField
                    fullWidth
                    label="Resumen"
                    name="summary"
                    required
                    variant="outlined"
                    error={Boolean(formik.touched.summary && formik.errors.summary)}
                    helperText={formik.touched.summary && formik.errors.summary}
                    value={!newsSummary ? newsDataComplete.Summary : formik.values.summary}
                    onChange={(event) => formik.setFieldValue("summary", event.target.value) && setNewsSummary(true)}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item md={6} xs={12} >
                  <TextField
                    fullWidth
                    id="state"
                    name="state"
                    label="Seleccione el estado *"
                    select
                    error={Boolean(formik.touched.state && formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    value={!newsState ? newsDataComplete.State : formik.values.state}
                    onChange={(event) => formik.setFieldValue("state", event.target.value) && setNewsState(true)}
                    variant="outlined"
                  >
                    {states.map((option, key) => (
                      <MenuItem value={option} key={key}>{option}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={12} xs={12} sx={{ float: 'left', width: '50%' }}>
                  <TextareaAutosize
                    id="description"
                    maxRows={10000}
                    style={formik.errors.description && formik.touched.description ? {
                      height: '9.3rem',
                      padding: '0.75rem',
                      borderRadius: '0.6rem',
                      width: '100%',
                      maxWidth: '100%',
                      maxHeight: '17rem',
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
                        height: '9.3rem',
                        padding: '0.75rem',
                        border: '0.8px solid #E3E3E3',
                        borderRadius: '0.6rem',
                        width: '100%',
                        maxWidth: '100%',
                        maxHeight: '17rem',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '16px',
                        lineHeight: '24px',
                        resize: 'vertical',
                        overflow: 'auto'
                      }}
                    aria-label="Descripcion"
                    name="description"
                    placeholder='Detalles *'
                    onChange={(event) => formik.setFieldValue("description", event.target.value) && setNewsDescription(true)}
                    onBlur={formik.handleBlur}
                    required
                    value={!newsDescription ? newsDataComplete.Description : formik.values.description}
                    variant="outlined"
                  />
                  {formik.errors.description && formik.touched.description ?
                    <div style={{ color: '#e76063', fontSize: '0.75rem' }}>{formik.errors.description}</div>
                    : null}
                </Grid>
              </Grid>
              <Grid item md={12} xs={12}>
                <Link target="_blank" href={"https://res.cloudinary.com/dxx9kwg6t/" + newsDataComplete.Media_file}>Imagen o video cargado</Link>
              </Grid>
            </CardContent>
            <Divider></Divider>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: '0.75rem', alignItems: 'center' }} >
              <div>
                <input
                  style={{ display: 'none' }}
                  id="media_file"
                  type="file"
                  accept='.png, .jpg, jpeg, .mp4, .mkv'
                  name="media_file"
                  required
                  onChange={(event) => formik.setFieldValue("media_file", event.target.files[0])}
                >
                </input>
                <label htmlFor="media_file"
                  style={{
                    color: '#5048E5', fontFamily: 'Inter', fontStyle: 'normal',
                    fontWeight: '600', fontSize: '0.87rem', lineHeight: '1.5rem', cursor: 'pointer'
                  }}>
                  Subir archivo
                </label>
              </div>
              <LoadingButton
                loading={loading}
                color="primary"
                variant="contained"
                onClick={(e) => { markErrors(e) && setLoading(!loading) }}>
                Actualizar Noticia
              </LoadingButton>
            </Box>
          </div>}
      </Card>
      {(modal == true) ? <ModalAlert
        title={"Noticia actualizada"}
        message={"La noticia fue actualizada exitosamente!"} modalState={modal}
        modalSuccess={true}
        routeURL={"/Noticias"}
        setModalState={setModal} /> : null
      }
      {(modalError == true) ?
        <ModalAlert
          title={"Noticia NO actualizada"}
          message={"La noticia NO se pudo actualizar!"} modalState={modalError}
          modalSuccess={false}
          setModalState={setModalError} /> : null
      }
    </form>
  )

}
