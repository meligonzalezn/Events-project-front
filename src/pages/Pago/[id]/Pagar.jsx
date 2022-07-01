import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Head from 'next/head';
import AccordionPayMethods from 'src/components/pay/AccordionPayMethods';
import CardCostAndPay from 'src/components/pay/CardCostAndPay';
import { DashboardLayout } from '../../../components/dashboard-layout';

export default function Pagar(props) {

  return (
    <>
      <Head>
        <title>
          Usuarios
        </title>
      </Head>

      <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
        <Container maxWidth={false}>
          <Box
            sx={{
              alignItems: 'center', display: 'flex', justifyContent: 'space-between',
              flexWrap: 'wrap', m: -1
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              Sección de pagos
            </Typography>
          </Box>

          <Box sx={{ py: 10 }} />

          <div className='wrapperPay'>
            <div></div>
            <AccordionPayMethods />
            <div></div>
            <CardCostAndPay />
            <div></div>
          </div>
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