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

export const EventListToolbar = ({isEmployee, searchHandleChange, setSuccessfulRegister }) => {
  const [updateEvent, setUpdateEvent] = useState(false);
  const styles = useStyles(); 
  const router = useRouter();

  const showButtons = () => {
    isEmployee = true;
    if(!isEmployee) return (<> </>);
    return(
      <Box sx={{ m: 1 }}>
          <Box sx={{ m: 1, gap: "12px", display: "flex" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => router.push("/Crear_evento")}
            >
              Añadir evento
            </Button>
            <Button color="primary" variant="contained"
              onClick = {() => setUpdateEvent(!updateEvent)}>
              Actualizar evento
            </Button>
          </Box>
        </Box>
    );
  }
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
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
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                onChange={searchHandleChange}
                placeholder="Buscar evento"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {updateEvent == true ? (
        <Modal open={updateEvent} onClose={() => setUpdateEvent(!updateEvent)}>
          <div className={styles.modal} style={{ width: "700px" }}>
            <EventsUpdateForm setSuccessfulRegister={setSuccessfulRegister} ></EventsUpdateForm>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </Box>
  );
};
