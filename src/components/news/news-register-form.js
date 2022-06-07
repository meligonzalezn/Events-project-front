import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  TextareaAutosize
} from '@mui/material';

const states = [
  {
    value: 'activo',
    label: 'Activo'
  },
  {
    value: 'inactivo',
    label: 'Inactivo'
  },
];

export const NewsRegisterForm = (props) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      summary: '',
      state: 'Activo',
      media_file: '',
      edition_date: new Date()
    },
    validationSchema: Yup.object().shape({
      title: Yup
        .string().required('Porfavor ingrese un título').max(500),
      description: Yup
        .string().required('Porfavor digite una descripción'),
      summary: Yup
        .string().required('Es necesario redactar un resumen'),
    })
  });
  /*const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });*/

  /*const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };*/

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader=""
          title="Escribir noticia"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Título"
                name="titulo"
                //onChange={handleChange}
                required
                //value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
               <TextField
                fullWidth
                label="Estado"
                name="estado"
                //onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                //value={values.state}
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
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Resumen"
                name="resumen"
                //onChange={handleChange}
                required
                //value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextareaAutosize
                fullWidth
                aria-label="text-area-details"
                placeholder="Detalles"
                style={{ width: 200 }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2, 
            gap:'0.75rem'
          }}
        >
          <Button
                sx={{border:0, color:'none'}}
                variant="contained"
                component="label">
                Subir archivo
                <input
                  type="file"
                  hidden
                />
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            Guardar
          </Button>


        </Box>
      </Card>
    </form>
  );
};
