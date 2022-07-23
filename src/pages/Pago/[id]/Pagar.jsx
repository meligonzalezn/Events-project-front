import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PayUser from 'src/components/forms/PayUser';
import SecuentialLoader from 'src/components/loaders/SecuentialLoader';
import PayMethod from 'src/components/pay/PayMethod';
import PayStepper from 'src/components/pay/PayStepper';
import PaySteps from 'src/components/pay/PaySteps';
import { DashboardLayout } from '../../../components/dashboard-layout';

const DATOS_PERSONALES = 0;
const METODO_PAGO = 1;
const PROCESANDO_PAGO = 2;

/**
 * Implementa todo el proceso de pagos con un stepper que le
 * indica al usuario en qué paso se encuentra actualmente.
 * Consta de 3 pasos cada uno invocando un componente diferente:
 * 1. Datos personales. 2. Método de Pago. 3. Procesando Pago.
 * @param {*} props 
 * @returns React component
 */
export default function Pagar(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [displayComponent, setDisplayComponent] = useState(<></>);
  const [validStep, setValidStep] = useState(false);
  const [validateData, setValidateData] = useState(false);
  const [successfulPay, setSuccessfulPay] = useState(false);

  useEffect(() => {
    setDisplayComponent(<PayUser setValidStep={setValidStep} validateData={validateData}
      setValidateData={setValidateData} />);

    /**
     * Deshace la reserva de cupos para las actividades seleccionadas.
     */
    const asyncTest = async () => {
      setTimeout(() => {
        if (successfulPay) return;

        // TODO interactuar con la BD.
      }, 8000);
    }

    const createData = () => {
      const actividades = [
        {
          "id": 2,
          "value": 23000
        },
        {
          "id": 3,
          "value": 21000
        }
      ]
      localStorage.setItem("actividades", JSON.stringify(actividades));
      localStorage.setItem("ID_User", "1");
      localStorage.setItem("ID_Event", "1");
    }

    asyncTest();
  }, [])

  /**
   * Despliega el componente que corresponda a la paginación.
   */
  useEffect(() => {
    const handlePageChange = () => {
      if (activeStep == PROCESANDO_PAGO) {
        setDisplayComponent(<SecuentialLoader upperMessage='Estamos procesando tu pago' lowerMessage='Por favor espera' setValidStep={setValidStep} setSuccessfulPay={setSuccessfulPay} />)
      } else if (activeStep == METODO_PAGO) {
        setDisplayComponent(<PayMethod setValidStep={setValidStep} validateData={validateData}
          setValidateData={setValidateData} />);
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