import Head from 'next/head';
import { Box ,Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

/**
 * 
 * @param {{setSuccessfulRegister: function}} props 
 * @returns 
 */
const UpdateNews = (props) => {
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
      <Container maxWidth="lg">
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            {/*<NewsRegisterForm setSuccessfulRegister={props.setSuccessfulRegister}></NewsRegisterForm>*/}
          </Grid>
      </Container>
    </Box>
  </>
);}

UpdateNews.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UpdateNews;