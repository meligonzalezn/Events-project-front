import Head from 'next/head';
import { Autocomplete, Box, Container, Divider, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tabla from 'src/components/tabla';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ConsultarUser = () => (
  <>
    <Head>
      <title>
        Consultar Usuario
      </title>
    </Head>

    <Container maxWidth="full">


      <Tabla rows={
        [{
          name: "name xd",
          rol: "rol"
        },
        {
          name: "name xd",
          rol: "rol2"
        }]
      } handleInhabilitar={(event) => console.log("XD")}></Tabla>
    </Container>
  </>
);

ConsultarUser.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ConsultarUser;
