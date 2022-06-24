import Head from 'next/head';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from 'src/components/account/account-profile';
import UserForm from 'src/components/forms/CreateUserForm';
import { createUser, update } from 'src/utils/userAxios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NotFund from "./../../404.js"

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
    let user = {}
    console.log("id", id)
    try{
      const users = JSON.parse(localStorage.getItem("usuarios"));
      console.log("users", users)
      user = users.find((user, index) => {
        if(user.id == id){
          console.log("user", index, user)
          return user
        }
        })
      console.log("user", user)
    }catch(err){
      return <NotFund></NotFund>
      user = {}
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
              <UserForm finalFunction={update} type={"Actualizar"} {...usuario}/>
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
