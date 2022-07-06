import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PayUser from 'src/components/forms/PayUser';
import PayMethod from 'src/components/pay/PayMethod';
import PayStepper from 'src/components/pay/PayStepper';
import PaySteps from 'src/components/pay/PaySteps';
import { DashboardLayout } from '../../../components/dashboard-layout';

const DATOS_PERSONALES = 0;
const METODO_PAGO = 1;
const PROCESANDO_PAGO = 2;
export default function Pagar(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [displayComponent, setDisplayComponent] = useState(<></>);
  const [validStep, setValidStep] = useState(false);
  const [validateData, setValidateData] = useState(false);

  useEffect(() => {
    setDisplayComponent(<PayUser setValidStep={setValidStep} validateData={validateData}
      setValidateData={setValidateData} />);
  }, [])

  /**
   * Despliega el componente que corresponda a la paginación.
   */
  useEffect(() => {
    const handlePageChange = () => {
      if (activeStep == PROCESANDO_PAGO) {
        setDisplayComponent(<></>)
        // ! Set fake loader to process pay.
      } else if (activeStep == METODO_PAGO) {
        setDisplayComponent(<PayMethod />);
      } else if (activeStep == DATOS_PERSONALES) {
        setDisplayComponent(<PayUser setValidStep={setValidStep} validateData={validateData}
          setValidateData={setValidateData} />);
      }

    }

    handlePageChange();
  }, [validateData, activeStep])

  return (
    <>
      <Head>
        <title>
          Pago
        </title>
      </Head>

      <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
        <Container maxWidth={false}>
          <Box
            sx={{
              alignItems: 'center', display: 'flex', justifyContent: 'space-between',
              flexWrap: 'wrap', m: -1
            }} >
            <Typography sx={{ m: 1 }} variant="h4">
              Sección de pagos
            </Typography>
          </Box>

          <Box sx={{ py: 4 }} />

          <PaySteps activeStep={activeStep} />

          {displayComponent}

          <Box sx={{ py: 2 }} />

          <PayStepper activeStep={activeStep} setActiveStep={setActiveStep}
            validStep={validStep} setValidStep={setValidStep}
            setValidateData={setValidateData} validateData={validateData}
          />
        </Container>
      </Box>
    </>
  )
}

Pagar.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);