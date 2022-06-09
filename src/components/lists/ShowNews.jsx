import { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { products } from 'src/__mocks__/products';
import { NewsNavbar } from '../news/NewsNavbar';
import { NewCard } from '../news/NewCard';
import LinearProgress from '@mui/material/LinearProgress';

const NEWS_PER_PAGE = 6;

/**
 * Muestra todas as noticias registradas en la base de datos mediante
 * paginación.
 * @param {*} props 
 * @returns 
 */
export default function ShowNews(props) {
  const [page, setPage] = useState(1); // We display 6 news per page.
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    // TODO Obtener las noticias.
    setNumPages(Math.ceil(products.length / NEWS_PER_PAGE));
    setLoading(false);
  }, [])

  /**
   * WIP
   * 
   * Debería acceder directamente a la ventana donde muestra
   * la noticia.
   * @param {event} e 
   */
  const testClick = (e) => {
    const newSelected = e.target.id;
  }

  /**
   * Obtiene los elementos que debería desplegar según la página
   * que ahaya seleccionado.
   * @returns Array de Cards que contengas la información pertinente
   *          a cada noticia.
   */
  const displayPageElements = () => {
    let elements = [];

    for (var i = (page - 1) * NEWS_PER_PAGE; i < Math.min(page * NEWS_PER_PAGE, products.length); i++) {
      elements.push(
        <Grid key={i} item lg={4} md={6} xs={12} name={i}>
          <NewCard id={i.toString()} new={products[i]} onClick={testClick} />
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

  if (loading) {
    return (
      <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
        <Container maxWidth={false}>
          <NewsNavbar />

          <Typography sx={{ py: 15 }} align="center" color="textPrimary" gutterBottom variant="h5">
            Estamos obteniendo tus noticias
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
            <Box sx={{ width: '60%' }}>
              <LinearProgress />
            </Box>
          </Box>

          <Typography sx={{ py: 19 }} align="center" color="textPrimary" gutterBottom variant="h5">
            Por favor espera
          </Typography>

        </Container>
      </Box>
    )
  } else return (
    <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
      <Container maxWidth={false}>
        <NewsNavbar />
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {displayPageElements()}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
          <Pagination page={page} color="primary" count={numPages} size="small"
            onChange={handlePageChange} />
        </Box>
      </Container>
    </Box>
  )
}