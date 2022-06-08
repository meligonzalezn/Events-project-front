import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
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

export const EventDetails = (props) => {
  const [values, setValues] = useState({
    title: "Cenita en la casa de Melissa",
    state: "Activo",
    enrollmentPrice: "0",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
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
                onChange={handleChange}
                required
                value={values.title}
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
                value={values.state}
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
              <ResponsiveDatePicker title="Fecha de inicio" />
            </Grid>
            <Grid item md={3.7} xs={12}>
              <ResponsiveDatePicker title="Fecha de finalización" />
            </Grid>
            <Grid item md={4.5} xs={12}>
              <TextField
                fullWidth
                label="Precio de inscripción"
                name="enrollmentPrice"
                onChange={handleChange}
                required
                value={values.enrollmentPrice}
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
                defaultValue=""
              />
            </Grid>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
            }}
          >
            <Button color="primary" fullWidth variant="text">
              Subir imagen
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
            }}
          >
            <Button color="primary" variant="contained">
              Guardar
            </Button>
          </Box>
        </Box>
      </Card>
    </form>
  );
};
