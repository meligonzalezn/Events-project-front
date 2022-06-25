import axios from 'axios'
import { Box, Button, Typography, Modal } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useStyles } from '../modals/modalAlert';
import { NewsUpdateForm } from './news-update-form';
/**
 * 
 * @param {{setCreateNewsState: function, isEmployee: boolean, createNewsState: boolean}}
 * @returns 
 */
export const NewsListToolbar = (props) => {
  const [updateNews, setUpdateNews] = useState(false);
  const styles = useStyles();
  const router = useRouter();
  const showButtons = () => {
    if (!props.isEmployee) return (<></>);
    return (
      <Box sx={{ m: 1, gap: '12px', display: 'flex' }}>
        <Button color="primary" variant="contained"
          onClick={() => {router.push('/crear_noticia') && props.setCreateNewsState(!props.createNewsState)}}
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
            flexWrap: 'wrap', m: -1, 
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Noticias
          </Typography>

          {showButtons()}
        </Box> 
      {(updateNews == true ) ? 
          <Modal open={updateNews} onClose={() => setUpdateNews(!updateNews)}>
              <div className={styles.modal} style={{width:'700px'}}>
                <NewsUpdateForm />
              </div>
          </Modal>:<></>
      }
    </Box>
  )
};
