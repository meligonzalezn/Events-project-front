import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { EventsPerYear } from '../components/reports/events-per-year';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { EventsInMonth } from 'src/components/reports/participants-events-in-month';
import { DashboardLayout } from '../components/dashboard-layout';
import { getEvents } from 'src/utils/eventAxios';
import { useEffect, useState } from 'react';
import LinearLoader from 'src/components/loaders/LinealLoader';

const Dashboard = () => { 
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState()

  useEffect(() => {
    if(loading) {
        /**
     * Obtiene los eventos de la BD.
     */
      const getData = async () => {
        await getEvents().then((res)=>{
          setEvents(res);
          setLoading(false);
        })      
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
      <LinearLoader upperMessage="Cargando reportes..."></LinearLoader>
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
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <EventsPerYear events= {events} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <EventsInMonth events={events} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
    }
  </>
);
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
