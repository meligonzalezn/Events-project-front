import Head from 'next/head';
import { Box, Divider ,Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { NewsRegisterForm } from 'src/components/news/news-register-form';

/**
 * 
 * @param {} props 
 * @returns 
 */
const CreateNews = (props) => {
  return(
  <>
    <Head>
      <title>
        Noticias
      </title>
    </Head>
    <Box {...props}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <NewsRegisterForm />
          </Grid>
      </Container>
    </Box>
  </>
);}

CreateNews.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CreateNews;