import { eventsTitle} from 'src/utils/newsAxios';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize } from '@mui/material';

export const NewsUpdateForm = (props) => {
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
                                label="Seleccione el evento"
                                name="event_name"
                                //onBlur={formik.handleBlur}
                                //onChange={formik.handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                //value={formik.values.event_name}
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
                    </Grid>
                </CardContent>
            </Card>    

        </form>
    )

}