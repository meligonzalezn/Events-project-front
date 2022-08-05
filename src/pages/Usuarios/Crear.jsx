import Head from 'next/head';
import { DashboardLayout } from '../../components/dashboard-layout';
import { Box, Container, Grid, Typography } from '@mui/material';
import CreateUserForm from 'src/components/forms/CreateUserForm';
import { useState } from 'react';
import { createUser } from '../../utils/userAxios';
import UserUploadImageCard from 'src/components/user/UploadImageCard';
import { defaultUserIcon } from 'src/utils/defaultImages';
import BackButton from 'src/components/BackButton';
export default function CrearUsuario(props) {
  const [userImage, setUserImage] = useState(defaultUserIcon);

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
          <Box
            sx={{
              alignItems: 'center', display: 'flex', justifyContent: 'space-between',
              flexWrap: 'wrap', m: -1,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4" >
              Crear Usuario
            </Typography>

            <BackButton route='/Usuarios' />
          </Box>

          <Grid container spacing={3} >
            <Grid item lg={4} md={6} xs={12} >
              <UserUploadImageCard image={userImage} setImage={setUserImage} />
            </Grid>
            <Grid item lg={8} md={6} xs={12} >
              <CreateUserForm type='Crear' finalFunction={createUser} userImage={userImage} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

CrearUsuario.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
