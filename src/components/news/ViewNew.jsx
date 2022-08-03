import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinearLoader from '../loaders/LinealLoader';
import AuthorCard from './AuthorCard';
import axios from 'axios';
import EventRegisterCard from '../events/RegisterCard';
import { getIdEventByIdNew } from 'src/utils/eventAxios';

/**
 * Proporciona la vista completa de una noticia, con datos del autor
 * y el titulo, resumen, imagen y descripción de la noticia.
 * @param {} props 
 * @returns 
 */
export default function ViewNew(props) {
  const [loading, setLoading] = useState(true);
  const [theNew, setTheNew] = useState({});
  const [autor, setAutor] = useState({});
  const [IdEvent, setIdEvent] = useState(null);


  useEffect(() => {
    /**
     * Obtiene la noticia del local storage. También obtiene el autor de
     * la noticia si no está guardado en el local storage, o si el autor
     * guardado no coincide con el de la noticia.
     */
    const getNoticia = async () => {
      const noticia = JSON.parse(localStorage.getItem("noticia"));
      setIdEvent(noticia.ID_event)
      let dataUser;

      if (localStorage.getItem("autor") == undefined || JSON.parse(localStorage.getItem("autor")).id != noticia.ID_user) {
        const userRequest = await axios.get(`http://localhost:8000/User/${noticia.ID_user}/`);
        dataUser = userRequest.data;
        localStorage.setItem("autor", JSON.stringify(dataUser));
      } else dataUser = JSON.parse(localStorage.getItem("autor"));
      setTheNew(noticia);
      setAutor(dataUser);
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
                {theNew.Title}
              </Typography>
            </Box>
          </CardContent>
        </Box>

        <Divider></Divider>

        <div className='wrapper'>
          <div />

          <div>
            <AuthorCard autor={autor} editionTime={theNew.Edition_date} />
            <EventRegisterCard is_ready={IdEvent !== null}/>
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
          </div>

          <div />
        </div>
      </Card>
    </>
  )
}