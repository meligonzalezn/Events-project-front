import React from 'react';
import { Modal, Grid, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useRouter } from 'next/router';


export const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    background: 'white',
    boxShadow: theme.shadows[5],
    padding: '1.6rem 1.6rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    borderRadius: '0.6rem'
  }
}))

export const ModalAlert = ({ title, message, modalState, setModalState, modalSuccess, routeURL, redirectTo }) => {
  const styles = useStyles();
  const router = useRouter();

  /**
   * Cuando se define el método 'setSuccessfulRegister' se
   * ejecutará para notificar al evento padre de un suceso
   * exitoso.
   */
  const onClose = () => {
    setModalState(!modalState);
    if (modalSuccess) {
      router.push(routeURL)
    }
  }

  return (
    <Modal open={modalState}
      onClose={onClose}>
      <div className={styles.modal} style={{ width: '29rem' }}>
        <Grid sx={{ textAlign: 'center' }}>
          <Grid sx={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center', color: '#5048E5' }}>
            <StickyNote2Icon></StickyNote2Icon>
            <Typography variant='h2' sx={{ color: '#5048E5', fontSize: '1.87rem', marginBottom: '0.6rem' }}>{title}</Typography>
          </Grid>
          <Divider />
          <Typography variant='subtitle1' sx={{ marginTop: '0.6rem' }}>{message}</Typography>
        </Grid>
      </div>
    </Modal>
  )
};

