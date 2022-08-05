import Head from "next/head";
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, InputAdornment, Pagination, SvgIcon, TextField } from '@mui/material';
//import { Search as SearchIcon } from '../../icons/search';
import { useRouter } from 'next/router';
import LinearLoader from '../components/loaders/LinealLoader';
import { EventListToolbar } from "../components/events/event-list-toolbar";
import { EventCard } from "../components/events/event-card";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from 'axios';
import { findAllWithWord } from 'src/utils/searchInStrings';

const NEWS_PER_PAGE = 6;

/**
 * Muestra todas los eventos registrados en la base de datos mediante
 * paginación.
 * @param {} 
 * @returns 
 */
const Events = () => {
  const [page, setPage] = useState(1); // We display 6 news per page.
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [dataEvents, setDataEvents] = useState();
  const [searchedEvents, setSearchedEvents] = useState();
  const [succesfulRegister, setSuccessfulRegister] = useState(false);

  const router = useRouter();

  useEffect(() => {
    /**
     * Obtiene los eventos de la BD.
     */
    const getEvents = async () => {
      const request = await axios.get("https://abc-app-univalle.herokuapp.com/Events/");
      const data = request.data;
      setDataEvents(data);
      setSearchedEvents(data);
      setNumPages(Math.ceil(data.length / NEWS_PER_PAGE));
      setLoading(false);
    }

    getEvents();
  }, [])

  /**
   * Debería acceder a la ventana donde muestra se muestra el evento
   * @param {event} e 
   */
  const testClick = (e) => {
    const eventSelected = e.target.id;
    console.log("event:", eventSelected);
    localStorage.setItem('evento', JSON.stringify(searchedEvents[eventSelected]));
    //console.log("monda1", JSON.stringify(searchedEvents[eventSelected]))
    router.push("Eventos/[id]/Ver", `Eventos/${searchedEvents[eventSelected].Title}/Ver`);
  }



  /**
   * Obtiene los elementos para desplegar , según la pagina seleccionada
   * @returns Array de Cards con los eventos de la pagina seleccionada
   */
  const displayPageElements = () => {
    let elements = [];

    // Ordena los eventos según las fechas mas recientes.
    searchedEvents.sort(function (a, b) {
      return new Date(b["Start_date"]) - new Date(a["Start_date"]);
    })

    for (var i = (page - 1) * NEWS_PER_PAGE; i < Math.min(page * NEWS_PER_PAGE, searchedEvents.length); i++) {
      elements.push(
        <Grid key={i} item lg={4} md={6} xs={12} name={i}>
          <EventCard id={i} event={searchedEvents[i]} onClick={testClick} />
        </Grid>
      );
    }

    return elements;
  }

  /**
   * Cambia el valor de 'page' a la página seleccionada.
   * @param {useless} _ 
   * @param {int} value 
   */
  const handlePageChange = (_, value) => {
    setPage(value);
  }

  const handleSearchEvents = (e) => {
    const searchedValue = e.target.value;
    const data = findAllWithWord(searchedValue, dataEvents, "Title");
    setSearchedEvents(data);
    setNumPages(Math.ceil(data.length / NEWS_PER_PAGE));
  }

  if (loading) {
    return (
      <LinearLoader
        upperMessage='Estamos cargando tus eventos'
        lowerMessage='Por favor espera'
      ></LinearLoader>
    )
  } else return (
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