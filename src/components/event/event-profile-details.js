import { useState , useEffect} from "react";
import Axios from "axios";
import {Image} from "cloudinary-react";
import * as Yup from "yup";
import {  useFormik} from "formik";
import {Box, Button,Card,CardContent,CardHeader,Divider,Grid,TextField,} from "@mui/material";
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

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
  
  

export const EventDetails = (props) => {
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    /**
   * Verifica si se cumplen las validaciones establecidas e inserta al nuevo usuario en la BD.
   */
    const validateAndUploadData = async () => {
      if(validating){
          console.log(formik.isValid)
          console.log("monda: ",formik.values)
          setValidating(true);

     }
    }

    validateAndUploadData();
  }, [validating] )
  
  
  const formSchema = Yup.object().shape({
    title: Yup.string()
      .required("Campo requerido")
      .min(5, "Mínimo 5 caracteres"),
    image: Yup
    .mixed()
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    )
  });

  const onSubmit = () => {
    console.log("submit", formik.errors);
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      image: '',
    },
    validationSchema: formSchema,
    onSubmit: onSubmit,
  });

  const [values2, setValues] = useState({
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

  const uploadImage = (files) => {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "cspbtq5u");
      Axios.post("https://api.cloudinary.com/v1_1/dyytwkgar/image/upload", formData).then((response) => console.log(response));
  };

  

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
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
                error={Boolean(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                required
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
                onChange={formik.handleChange}
                value={formik.values.state}
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
              <ResponsiveDatePicker name="start_date" title="Fecha de inicio" onChange={formik.handleChange}
                value={formik.values.start_date} />
            </Grid>
            <Grid item md={3.7} xs={12}>
              <ResponsiveDatePicker name="finish_date" title="Fecha de finalización"  onChange={formik.handleChange}
                value={formik.values.finish_date}/>
            </Grid>
            <Grid item md={4.5} xs={12}>
              <TextField
                fullWidth
                label="Precio de inscripción"
                name="enrollment_price"
                required
                error={Boolean(formik.touched.enrollment_price && formik.errors.enrollment_price)}
                helperText={formik.touched.enrollment_price && formik.errors.enrollment_price}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.enrollment_price}
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
                error={Boolean(formik.touched.details && formik.errors.details)}
                helperText={formik.touched.details && formik.errors.details}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Image cloudName="dyytwkgar"  publicId ="https://res.cloudinary.com/dyytwkgar/image/upload/v1654811261/hcokwzqk7i2hia76qzgv.png"
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
            <Button variant="contained" component="label">
              Subir imagen
              <input type="file" hidden name="file" onChange={formik.handleChange}/>
            </Button>
          </Box>
          
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
            }}
          >
            <Button color="primary" variant="contained" onClick={(e) => {
            markErrors(e)}}>
              Guardar
            </Button>
          </Box>
        </Box>
     
      </Card>
    </form>
  );
};
