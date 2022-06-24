import Head from 'next/head';
import { Autocomplete, Box, Container, Divider, Grid, Pagination, Button } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tabla from 'src/components/tabla';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUsers } from 'src/utils/userAxios';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/**
 * 
 * GUI that show user informetion saved on DB.
 */
const ConsultarUser = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [EnableUsers, setEnableUsers] = useState(true);

  const handleShowUserList = () =>{
    setEnableUsers(!EnableUsers)
  }

  useEffect(async () => {
    const [usuarios, error] = await getUsers();
    localStorage.setItem('usuarios', error ? JSON.stringify([]) : JSON.stringify(usuarios))
    // Date.now()
    setUsuarios(error ? [] : usuarios);
  }
  , [])

  return (
    <>
      <Head>
        <title>
          Consultar Usuario
        </title>
      </Head>

      <Container maxWidth="full">


        <Tabla rows={usuarios} StateExpected={EnableUsers}></Tabla>

      <Button onClick={handleShowUserList}>
        {EnableUsers ? 'Inhabilitados' : 'Usuarios habilitados'}
      </Button>
      </Container>
  
    </>
  )
};

ConsultarUser.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ConsultarUser;
