import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinearLoader from '../loaders/LinealLoader';
import AuthorCard from './AuthorCard';

/**
 * 
 * @param {{id: string}} props 
 * @returns 
 */
export default function ViewNew(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNoticia = () => {
      // TODO obtener datos de la noticia individual.
      setLoading(false);
    }

    getNoticia();
  }, [])

  if (loading) {
    return (
      <LinearLoader
        upperMessage='Estamos cargando tu noticia'
        lowerMessage='Por favor espera'
      ></LinearLoader>
    )
  }
  return (
    <>
      <Card className='allHeight'>
        <Box sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', }}>
              <Typography sx={{ m: 1 }} variant="h4">
                Noticias
              </Typography>
            </Box>
          </CardContent>
        </Box>

        <Divider></Divider>

        <div className='wrapper'>
          <div>
            <AuthorCard></AuthorCard>
          </div>

          <div className='wrapperCenter'>
            <Divider className='toCenter' orientation='vertical' sx={{ height: '90%' }} />
          </div>

          <div className='ownOverflow'>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
          </div>
        </div>
      </Card>
    </>
  )
}