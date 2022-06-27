import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";
import UserUploadImageCard from "src/components/user/UploadImageCard";
import ViewSignUp from "src/components/ViewSignUp";
import { defaultUserIcon } from "src/utils/defaultImages";

export default function SignUp(props) {
  const [userImage, setUserImage] = useState(defaultUserIcon);
  return (
    <>
      <Head>
        <title>
          Registro
        </title>
      </Head>

      <Box component="main" sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }}>
        <Container maxWidth="sm">
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4" >
              Crea una nueva cuenta
            </Typography>

            <Typography color="textSecondary" gutterBottom variant="body2">
              Usa tu email para crear una nueva cuenta
            </Typography>
          </Box>
          <UserUploadImageCard image={userImage} setImage={setUserImage} />
          <ViewSignUp userImage={userImage} />
        </Container>
      </Box>
    </>
  )
}