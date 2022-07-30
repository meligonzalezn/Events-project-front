import Head from 'next/head';
import { Box, Divider ,Container, Grid, Typography } from '@mui/material';
import MapComponent from 'src/components/map/map';
import { EventDetails } from 'src/components/events/event-profile-details';
import { DashboardLayout } from 'src/components/dashboard-layout';
import LinearLoader from 'src/components/loaders/LinealLoader';
import { useState } from 'react';

const UpdateEvent = () => {
  const [loading, setLoading] = useState(true);
  const eventData = JSON.parse(localStorage.getItem("DatosEvento"));
  console.log("EventData: ", eventData)
  const {MapRender, getPlace} = MapComponent(eventData["Space"]); 
  const mapsCard = MapRender();
  

  return(
  <>
    <Head>
      <title>
        Eventos
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Divider/>
            {mapsCard}
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <EventDetails  updateEvent={true} eventValues={eventData} eventPlace={getPlace} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);}

UpdateEvent.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UpdateEvent;