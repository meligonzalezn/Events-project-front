import Head from "next/head";
import { Box, Container, Grid, Pagination,  CircularProgress } from "@mui/material";
import { usePagination } from '@mui/material/Pagination';
import LinearLoader from '../components/loaders/LinealLoader';
import { EventListToolbar } from "../components/event/event-list-toolbar";
import { EventCard } from "../components/events/event-card";
import { DashboardLayout } from "../components/dashboard-layout";
//import { Pagination } from "../../components/pagination/pagination"
import { useState, useEffect } from "react";
import axios from 'axios'

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);
  
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(()=> {

    const fetchEvents = async () => {
        const res = await axios.get("http://localhost:8000/Events/")
        setEvents(res.data)
        setLoading(false)
    }

    fetchEvents();
    
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return ( loading? 
    <LinearLoader
        upperMessage='Estamos cargando tus eventos'
        lowerMessage='Por favor espera'
      ></LinearLoader>
  :
    <>
      <Head>
        <title>Eventos</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <EventListToolbar searchHandleChange={handleSearchEvents} />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {/* {currentEvents.map((event, key) => (
                <Grid item key={key} lg={4} md={6} xs={12}>
                  <EventCard event={event} />
                </Grid>
              ))} */}
              {displayPageElements()}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            {/* <Pagination color="primary" page={currentPage} onChange={handleChange} count={Math.ceil(events.length / eventsPerPage)} size="small" /> */}
            <Pagination page={page} color="primary" count={numPages} size="small"
            onChange={handlePageChange} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Events.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Events;
