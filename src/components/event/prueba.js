export const EventListToolbar = ({searchHandleChange, setSuccessfulRegister }) => {
    const [updateEvent, setUpdateEvent] = useState(false);
    const styles = useStyles(); 
    const router = useRouter();
  
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