import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinearLoader from '../loaders/LinealLoader';
import AuthorCard from './AuthorCard';
import axios from 'axios';

/**
 * 
 * @param {{id: string}} props 
 * @returns 
 */
export default function ViewNew(props) {
  const [loading, setLoading] = useState(true);
  const [theNew, setTheNew] = useState({});

  useEffect(() => {
    const getNoticia = async () => {
      const request = await axios.get(`http://localhost:8000/News/${props.id}/`);
      const data = request.data;
      setTheNew(data);
      setLoading(false);
      console.log(data);
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
                {theNew.Title}
              </Typography>
            </Box>
          </CardContent>
        </Box>

        <Divider></Divider>

        <div className='wrapper'>
          <div />

          <div>
            <AuthorCard></AuthorCard>
          </div>

          <div className='wrapperCenter'>
            <Divider className='toCenter' orientation='vertical' sx={{ height: '90%' }} />
          </div>

          <div className='ownOverflow'>
            <Typography align="left" color="textPrimary" variant="body1" sx={{ marginBottom: '8.4px', pt: 3, px: 1 }}>
              {theNew.Summary}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', px: 5, pt: 3 }}>
              <img
                style={{ height: '290px', width: '100%', objectFit: 'cover' }}
                alt="Product"
                src={"https://res.cloudinary.com/dxx9kwg6t/" + theNew.Media_file}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://res.cloudinary.com/dxx9kwg6t/image/upload/v1655159261/media/images_videos_news/il-news-and-press-default-card-img_kcsr9g.jpg" }}
                variant="square"
              />
            </Box>

            <Typography align="left" color="textPrimary" variant="body1" sx={{ marginBottom: '8.4px', pt: 4, px: 1 }}>
              {theNew.Description}
            </Typography>

            <Typography align="left" color="textPrimary" variant="body1" sx={{ marginBottom: '8.4px', pt: 4, px: 1 }}>
              {theNew.Description}
            </Typography>

            <Typography align="left" color="textPrimary" variant="body1" sx={{ marginBottom: '8.4px', pt: 4, px: 1 }}>
              {theNew.Description}
            </Typography>
          </div>

          <div />
        </div>
      </Card>
    </>
  )
}