import { Box, Container, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * Crea un loader con un mensaje 'upperMessage' en la parte superior del loader
 * y un mensaje 'lowerMessage' en la parte inferior del loader.
 * 
 * @param {{upperMessage: string, lowerMessage: string}} props 
 * @returns Loader
 */
export default function LinearLoader(props) {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
      <Container maxWidth={false}>

        <Typography sx={{ py: 15 }} align="center" color="textPrimary" gutterBottom variant="h5">
          {props.upperMessage}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
          <Box sx={{ width: '60%' }}>
            <LinearProgress />
          </Box>
        </Box>

        <Typography sx={{ py: 19 }} align="center" color="textPrimary" gutterBottom variant="h5">
          {props.lowerMessage}
        </Typography>

      </Container>
    </Box>
  )
}