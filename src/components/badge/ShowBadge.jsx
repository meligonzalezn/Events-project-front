import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Divider, Typography } from '@mui/material';
import LinearLoader from '../loaders/LinealLoader';
import axios from 'axios';
import { saveAs } from 'file-saver';

/**
 * Muestra todas as noticias registradas en la base de datos mediante
 * paginación.
 * @param {{isEmployee: boolean}} props 
 * @returns 
 */
export default function ShowBadge(props) {
  const [loading, setLoading] = useState(true);
  const [badgeURL, setBadgeURL] = useState('');

  useEffect(() => {
    /**
     * Obtiene las escarapela desde el back.
     */
    const getBadge = async () => {
      const user = 1;
      const request = await axios.get(`http://localhost:8000/User/${user}/get_badge/`);
      const data = request.data.url;
      console.log(data)
      setBadgeURL(data)
      setLoading(false);
    }

    getBadge();
  }, [])

  const downloadImage = () => {
    // TODO generar el nombre de la escarapela con el nombre del usuario que la está descargando.
    saveAs(badgeURL, "escarapela")
  }

  if (loading) {
    return (
      <LinearLoader
        upperMessage='Estamos generando tu escarapela'
        lowerMessage='Por favor espera'
      ></LinearLoader>
    )
  } else return (
    <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
      <Container maxWidth={false}>
        <Box sx={{
          alignItems: 'center', display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', m: -1
        }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Escarapela
          </Typography>
        </Box>

        <Card {...props}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                alt="Product"
                src={badgeURL}
                variant="square"
              />
            </Box>
          </CardContent>

          <Divider />

          <Box sx={{ p: 2, gap: '0.25rem' }} >
            <div className='wrapperCenter'>
              <Button color="primary" variant="contained" className="toCenter"
                onClick={downloadImage}
              >
                Descargar Escarapela
              </Button>
            </div>
          </Box>
        </Card>
      </Container>
    </Box>
  )
}