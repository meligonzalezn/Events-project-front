import axios from 'axios'
import {Box,Button,Typography, Modal} from '@mui/material';
import { useState } from 'react';
 
import {NewsRegisterForm} from '../news/news-register-form'
import {useStyles} from "../modals/modalAlert"

export const NewsListToolbar = (props) => {
    const [buttonNews, setButtonNews] = useState(false);
    const styles = useStyles();     

    return(
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
            Noticias
            </Typography>
            <Box sx={{ m: 1, gap:'12px', display:'flex'}}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setButtonNews(!buttonNews)}
                >
                    Añadir noticia
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => console.log("aquí se hace el update")}
                >
                    Actualizar noticia
                </Button>
            </Box>
        </Box>
        {(buttonNews == true) ? 
        <Modal open={buttonNews} onClose={() => setButtonNews(!buttonNews)}>
            <div className={styles.modal}>
                <NewsRegisterForm ></NewsRegisterForm>
            </div>
        </Modal>:<></>}
    </Box>
    )
  };
  