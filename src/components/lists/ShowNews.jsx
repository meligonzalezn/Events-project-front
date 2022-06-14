import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, InputAdornment, Pagination, SvgIcon, TextField } from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { useRouter } from 'next/router';
import LinearLoader from '../loaders/LinealLoader';
import { NewsListToolbar } from '../news/news-list-toolbar';
import axios from 'axios';
import NewsCard from '../news/news-card';

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
  const [dataNews, setDataNews] = useState();
  const [searchNew, setSearchNew] = useState('')

  const router = useRouter();

  useEffect(() => {
    /**
     * Obtiene las noticias de la BD.
     */
    const getNews = async () => {
      const request = await axios.get("http://localhost:8000/News/");
      const dataN = request.data;
      setDataNews(dataN);
      setNumPages(Math.ceil(dataN.length / NEWS_PER_PAGE));
      setLoading(false);
      console.log(dataN);
    }

    getNews();
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
    router.push("Noticias/[id]/Ver", `Noticias/${newSelected}/Ver`);
  }

  /**
   * Obtiene los elementos que debería desplegar según la página
   * que ahaya seleccionado.
   * @returns Array de Cards que contengas la información pertinente
   *          a cada noticia.
   */
  const displayPageElements = () => {
    let elements = [];

    for (var i = (page - 1) * NEWS_PER_PAGE; i < Math.min(page * NEWS_PER_PAGE, dataNews.length); i++) {
      elements.push(
        <Grid key={i} item lg={4} md={6} xs={12} name={i}>
          <NewsCard id={dataNews[i].id} new={dataNews[i]} onClick={testClick} />
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
      <LinearLoader
        upperMessage='Estamos cargando tus noticias'
        lowerMessage='Por favor espera'
      ></LinearLoader>
    )
  } else return (
    <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
      <Container maxWidth={false}>
        <NewsListToolbar />

        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  onChange={(event) => { setSearchNew(event.target.value) }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Buscar noticia"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

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