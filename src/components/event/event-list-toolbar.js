import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Modal
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { useRouter } from "next/router";
import { useState } from "react";
import {useStyles} from "../modals/modalAlert"
import {EventsUpdateForm} from "../events/event-update-form"

export const EventListToolbar = (props) => {
  const router = useRouter();
  return (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Eventos
      </Typography>
      <Box sx={{ m: 1 }}>
      <Box sx={{ m: 1, gap: '12px', display: 'flex' }}>
      {(localStorage.getItem('userRole') == 'Cliente') ? 
       null :
       <>
        <Button
          color="primary"
          variant="contained"
          onClick={ () => router.push('/Crear_evento')}>
          Añadir evento
        </Button>
        <Button
        color="primary"
        variant="contained">
        Actualizar evento
        </Button>
       </> 
      }  
      </Box>
    </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Buscar evento"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);}
