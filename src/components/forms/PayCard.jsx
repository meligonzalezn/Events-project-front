import * as Yup from 'yup';
import { CardContent, Divider, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { splitYearAndMonth } from 'src/utils/string-processing';

const IDType = [{
  value: "CC",
  label: "CC"
},
{
  value: "CE",
  label: "CE"
},
{
  value: "TI",
  label: "TI"
}];

/**
 * 
 * 
 * @param {{setValidStep: function, validateCard: boolean,
 *          setValidateCard: function, cardType: string,
 *          cardTypeSelected: string}} props 
 * @returns React component.
 */
export default function PayCard(props) {
  const [upload, setUpload] = useState(false);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  Yup.addMethod(Yup.string, "validDate", function () {
    return this.test(`validDate`, "La fecha de expiración no puede ser anterior a la fecha actual", function () {
      const yearAndMonth = splitYearAndMonth(formik.values.Expiration);
      const year = yearAndMonth[0];
      const month = yearAndMonth[1];
      if (year < currentYear || (year == currentYear && month < currentMonth)) {
        return false;
      }
      return true;
    })
  })

  Yup.addMethod(Yup.string, "cardNumber", function () {
    return this.test(`cardNumber`, "El número de la tarjeta no es válido", function () {
      return /^[0-9]+$/.test(formik.values.CardNumber);
    })
  })

  const formik = useFormik({
    initialValues: {
      CardNumber: '',
      FullName: '',
      Expiration: `${currentYear}-${currentMonth > 9 ? currentMonth : '0' + currentMonth.toString()}`,
      CVV: '',
      IDType: 'CC',
      IDNumber: '',
    },
    validationSchema: Yup.object().shape({
      CardNumber: Yup
        .string().required('Es necesario digitar el número de su tarjeta').cardNumber().max(16, "El número de la tarjeta debe constar de 16 digitos").min(16, "El número de la tarjeta debe constar de 16 digitos"),
      FullName: Yup
        .string().required('Es necesario digitar su nombre completo').max(120).min(6),
      CVV: Yup
        .string().required('Se precisa del CVV para efectuar el pago').max(5).min(3),
      IDNumber: Yup
        .string().required('Es necesario digitar el número de su identificacion').max(20).min(4),
      Expiration: Yup
        .string().validDate()
    })
  });

  useEffect(() => {
    /**
   * Verifica si se cumplen las validaciones establecidas e inserta al nuevo usuario en la BD.
   */
    const validateAndUploadData = () => {
      if (!upload) return;

      if (formik.isValid) {
        props.setValidStep(true);
      }

      setUpload(false);
    }

    validateAndUploadData();
  }, [upload])

  useEffect(() => {
    /**
   * Valida los campos, revisando que las validaciones se cumplan, y tocando (marcando que ya se tocaron)
   * los campos que existen. 
   */
    const markErrors = async () => {
      if (!props.validateCard || props.cardType !== props.cardTypeSelected) return;
      props.setValidateCard(false);

      const [resp] = await Promise.all([formik.validateForm()]);

      for (var key in formik.values) {
        formik.setFieldTouched(key, true);
      }

      setUpload(true);
    }

    markErrors();
  }, [props.validateCard]);

  return (
    <form
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      {...props}
    >

      <Divider />

      <CardContent>
        <Grid container spacing={3} >
          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              error={Boolean(formik.touched.CardNumber && formik.errors.CardNumber)}
              helperText={formik.touched.CardNumber && formik.errors.CardNumber}
              label="Número de tarjeta"
              name="CardNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.CardNumber}
              variant="outlined"
            />
          </Grid>

          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              error={Boolean(formik.touched.FullName && formik.errors.FullName)}
              helperText={formik.touched.FullName && formik.errors.FullName}
              label="Nombre completo"
              name="FullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              value={formik.values.FullName}
              variant="outlined"
            />
          </Grid>

          <Grid item md={6} xs={12} >
            <TextField
              error={Boolean(formik.touched.Expiration && formik.errors.Expiration)}
              helperText={formik.touched.Expiration && formik.errors.Expiration}
              fullWidth
              label="Fecha de expiración"
              name="Expiration"
              type="month"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.Expiration}
              variant="outlined"
            />
          </Grid>

          <Grid item md={6} xs={12} >
            <TextField
              error={Boolean(formik.touched.CVV && formik.errors.CVV)}
              helperText={formik.touched.CVV && formik.errors.CVV}
              fullWidth
              label="Codigo de seguridad"
              name="CVV"
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.CVV}
              variant="outlined"
            />
          </Grid>

          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              label="Tipo de identificación"
              name="IDType"
              onChange={formik.handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={formik.values.IDType}
              variant="outlined"
            >
              {IDType.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              error={Boolean(formik.touched.IDNumber && formik.errors.IDNumber)}
              helperText={formik.touched.IDNumber && formik.errors.IDNumber}
              label="Número de identificación"
              name="IDNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              required
              value={formik.values.IDNumber}
              variant="outlined"
            />
          </Grid>

        </Grid>
      </CardContent>
    </form>
  );
}