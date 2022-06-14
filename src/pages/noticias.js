import Head from 'next/head';
import axios from 'axios'
import { Box, Container, Grid, Pagination, CircularProgress, Card,CardContent,TextField,InputAdornment,SvgIcon } from '@mui/material';
import { Search as SearchIcon } from '../icons/search'; 
import { NewsListToolbar } from '../components/news/news-list-toolbar';
import { NewsCard } from '../components/news/news-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';

const Noticias = () => {
  const [dataNews, setDataNews] = useState();
  const [searchNew, setSearchNew] = useState('')
  axios.get("http://localhost:8000/News/").then((res) => {
    setDataNews(res.data)
  })
  
  if(dataNews === undefined) {
    return( 
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'auto'}}>
      <CircularProgress></CircularProgress>  
    </div>)
  }
  return(
  <>
    <Head>
      <title>
        Noticias
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>

        <NewsListToolbar />
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
                <Box sx={{ maxWidth: 500 }}>
                <TextField
                    onChange={(event) => {setSearchNew(event.target.value)}}
                    fullWidth
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SvgIcon
                            fontSize="small"
                            color="action"
                        >
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
          <Grid
            container
            spacing={3}
          >
            {dataNews.map((news, key) => (
              <Grid
                item
                key={key}
                lg={4}
                md={6}
                xs={12}
              >
                <NewsCard news={news} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
  )
};

Noticias.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Noticias;
