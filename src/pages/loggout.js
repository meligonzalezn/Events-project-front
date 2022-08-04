import { useEffect } from "react";
import { loggout } from "src/utils/loginAxios";

const { Typography } = require("@mui/material");
const { Box } = require("@mui/system");

function Loggout(){

  useEffect(() =>{
    console.log("DESLOGUEANDO")
    loggout()
    localStorage.setItem('userRole','')
    localStorage.setItem('userName','')
    localStorage.setItem('idUser','')
    localStorage.setItem('userState','')
    localStorage.setItem('urlUserImage','')
  }, [])

  return(
    <Box>
      <Typography>
        You're logging out.
      </Typography>
    </Box>
  )
}

export default Loggout