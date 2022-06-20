import axios from 'axios'
import { Box, Button, Typography, Modal } from '@mui/material';
import { useState } from 'react';
import { NewsRegisterForm} from '../news/news-register-form'
import { NewsUpdateForm } from './news-update-form';
import {useStyles} from "../modals/modalAlert"

/**
 * 
 * @param {{setSuccessfulRegister: function, isEmployee: boolean}} props 
 * @returns 
 */
export const NewsListToolbar = (props) => {
    const [buttonNews, setButtonNews] = useState(false);
    const [updateNews, setUpdateNews] = useState(false);
    const styles = useStyles();     

  const showButtons = () => {
    if (!props.isEmployee) return (<></>);
    return (
      <Box sx={{ m: 1, gap: '12px', display: 'flex' }}>
        <Button color="primary" variant="contained"
          onClick={() => setButtonNews(!buttonNews)}
        >
          Añadir noticia
        </Button>

        <Button
          color="primary"
          variant="contained"
          onClick={() => setUpdateNews(!updateNews)}
        >
          Actualizar noticia
        </Button>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center', display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', m: -1
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Noticias
        </Typography>

        {showButtons()}
      </Box>
      {(buttonNews == true) ?
        <Modal open={buttonNews} onClose={() => setButtonNews(!buttonNews)}>
          <div className={styles.modal}>
            <NewsRegisterForm setSuccessfulRegister={props.setSuccessfulRegister} />
          </div>
        </Modal> : <></>}
      {(updateNews == true ) ? 
          <Modal open={updateNews} onClose={() => setUpdateNews(!updateNews)}>
              <div className={styles.modal} style={{width:'700px'}}>
                <NewsUpdateForm setSuccessfulRegister={props.setSuccessfulRegister} ></NewsUpdateForm>
              </div>
          </Modal>:<></>
      }
    </Box>
  )
};
