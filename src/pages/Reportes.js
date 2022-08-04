import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { EventsPerYear } from '../components/reports/events-per-year';
import { EventsInMonth } from 'src/components/reports/participants-events-in-month';
import { DashboardLayout } from '../components/dashboard-layout';
import { getEvents } from 'src/utils/eventAxios';
import { useEffect, useState } from 'react';
import { ActivitiesPerEvent } from 'src/components/reports/participants-activities-by-event';
import { IncomesPerYear } from 'src/components/reports/incomes-by-month-per-year';
import LinearLoader from 'src/components/loaders/LinealLoader';
import axios from 'axios';


const Reports = () => { 
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState()
  const [payments, setPayments] = useState()

  useEffect(() => {
    if(loading) {
        /**
     * Obtiene los eventos y pagos de la BD.
     */
      const getData = async () => {
        await getEvents().then((res)=>{
          setEvents(res);  
        })
        const res = await axios.get("http://localhost:8000/Payment/")
        const paymentsData = res.data
        setPayments(paymentsData)
        setLoading(false);      
      }
      getData(); 

    }
    
  }, [])

  return(
  <>
    <Head>
      <title>
        Reportes 
      </title>
    </Head>
    {loading? 
      <LinearLoader upperMessage='Estamos cargando tus reportes'
      lowerMessage='Por favor espera'></LinearLoader>
    :
         
        <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <Typography sx={{ m: 1 }} variant="h4">
          Reportes
        </Typography>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <EventsPerYear events= {events} />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={3}
            xs={12}
          >
            <EventsInMonth events={events} payments={payments} />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={3}
            xs={12}
          >
            <ActivitiesPerEvent events ={events} payments={payments}/>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <IncomesPerYear payments= {payments} />
          </Grid>
        </Grid>
      </Container>
    </Box>
    }
  </>
);
};

Reports.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Reports;
