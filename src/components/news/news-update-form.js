import * as Yup from 'yup';
import { newsTitle} from 'src/utils/newsAxios';
import { useFormik } from 'formik';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize } from '@mui/material';

export const NewsUpdateForm = (props) => {
    const date = new Date()
    const formik = useFormik({
        initialValues: {
          title: '',
          description: '',
          summary: '',
          state: '',
          news_name: 'Noticia',
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
      
    return(
        <form
            autoComplete="off"
            {...props}>
            <Card>
                <CardHeader
                    subheader="Actualice una noticia aquí"
                    title="Noticia"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={3} > 
                        <Grid item md={12} xs={12} >
                            <TextField
                                fullWidth
                                //error = {Boolean(formik.touched.event_name && formik.errors.event_name)}
                                //helperText={formik.touched.event_name && formik.errors.event_name}
                                label="Seleccione la noticia"
                                name="news_name"
                                //onBlur={formik.handleBlur}
                                //onChange={formik.handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                //value={formik.values.event_name}
                                variant="outlined"
                            >
                                {newsTitle.map((option, key) => (
                                <option key={key} value={option}
                                >
                                    {option}
                                </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>    

        </form>
    )

}