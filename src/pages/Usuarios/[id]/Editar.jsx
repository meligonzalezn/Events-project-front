import Head from 'next/head';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from 'src/components/account/account-profile';
import UserForm from 'src/components/forms/CreateUserForm';
import { createUser, update } from 'src/utils/userAxios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * 
 * @param {{  id: string
 * }} props 
 *
 */
const EditarUsuario = () => {
  const router = useRouter()
  const { id } = router.query
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    try{
      const user = JSON.parse(localStorage.getItem("usuarios"))[id-1];
    }catch(err){
      const user = {}
    }
    setUsuario(user ? user : {})
    setLoading(false);
  }, [])

  if(loading){
    return (<></>)
  }

  return (
    <>
      <Head>
        <title>
          Usuarios
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
          <Typography sx={{ mb: 3 }} variant="h4" >
            Editar Usuario
          </Typography>

          <Grid container spacing={3} >
            <Grid item lg={4} md={6} xs={12} >
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12} >
              <UserForm id={id} finalFunction={update} type={"Actualizar"} {...usuario}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

EditarUsuario.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default EditarUsuario;
