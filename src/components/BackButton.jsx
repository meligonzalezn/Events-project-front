import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

/**
 * Retorna un botón de atrás que dirige hacia 'ruta'.
 * @param {{route: string, sx: {}}} props 
 * @returns 
 */
export default function BackButton(props) {
  const router = useRouter();

  const applySx = () => {
    if (props.sx) {
      return (
        <ArrowBackIcon sx={props.sx} />
      )
    }
    return (<ArrowBackIcon />)
  }

  return (
    <Box sx={{ m: 1, gap: '12px', display: 'flex' }}>
      <Button color="primary" variant="contained"
        onClick={() => { router.push(props.route) }}
      >
        {applySx()}
      </Button>
    </Box>
  )
}