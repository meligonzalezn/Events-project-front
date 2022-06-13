import Head from 'next/head';
import axios from 'axios'
import { Box, Container, Grid, Pagination, CircularProgress } from '@mui/material';
import { products } from '../__mocks__/products';
import { NewsListToolbar } from '../components/news/news-list-toolbar';
import { NewsCard } from '../components/news/news-card';
import { DashboardLayout } from '../components/dashboard-layout';
import {DataEventsComplete} from "../utils/newsAxios";
import { useEffect, useState } from 'react';

const Noticias = () => {
  const [dataNews, setDataNews] = useState();

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
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {dataNews.map((news) => (
              <Grid
                item
                key={news.id}
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
