import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
/**
 * 
 * @param {{isEmployee: boolean}} props
 * @returns 
 */
export const UserNavbar = (props) => {
  const router = useRouter();
  const showButtons = () => {
    if (!props.isEmployee) return (<></>);
    return (
      <Box sx={{ m: 1, gap: '12px', display: 'flex' }}>
        <Button color="primary" variant="contained"
          onClick={() => { router.push('/Usuarios/Crear') }}
        >
          Crear usuario
        </Button>
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center', display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', m: -1, pt: 4
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Usuarios
        </Typography>

        {showButtons()}
      </Box>
    </Box>
  )
};
