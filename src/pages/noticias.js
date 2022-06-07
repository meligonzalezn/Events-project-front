import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { NewsListToolbar } from '../components/news/news-list-toolbar';
import { NewsCard } from '../components/news/news-card';
import { DashboardLayout } from '../components/dashboard-layout';

const Noticias = () => (
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
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <NewsCard news={product} />
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
);

Noticias.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Noticias;
