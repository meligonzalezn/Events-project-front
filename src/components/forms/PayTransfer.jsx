import { CardContent, Divider, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { banks } from "src/utils/bankList";

/**
 * Retorna un selecter para seleccionar el banco con el que se
 * desea hacer una transferencia bancaria.
 * @returns React component.
 */
export default function PayTransfer() {
  const formik = useFormik({
    initialValues: {
      Bank: 'NEQUI'
    }
  });

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >

      <Divider />

      <CardContent>
        <Grid container spacing={3} >

          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              label="Seleccion su banco"
              name="Bank"
              onChange={formik.handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={formik.values.Bank}
              variant="outlined"
            >
              {banks.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

        </Grid>
      </CardContent>
    </form>
  );
}