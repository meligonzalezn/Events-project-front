import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Clock as ClockIcon } from '../../icons/clock';

/**
 * Crea y retorna una Card con la información pertinente a una noticia.
 * @param {{new: object, onClick: function, id: string}} props 
 * @returns React Component
 */
export default function NewsCard(props) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ padding: 0 }}>

        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3, }}>
          <img
            style={{ height: '290px', width: '100%', objectFit: 'cover' }}
            alt="Product"
            src={"https://res.cloudinary.com/dxx9kwg6t/" + props.new.Media_file}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://res.cloudinary.com/dxx9kwg6t/image/upload/v1655159261/media/images_videos_news/il-news-and-press-default-card-img_kcsr9g.jpg" }}
            variant="square"
          />
        </Box>

        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {props.new.Title}
        </Typography>

        <Typography align="center" color="textPrimary" variant="body1" sx={{ marginBottom: '8.4px' }}>
          {props.new.Summary}
        </Typography>
      </CardContent>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{display:'flex', justifyContent:'space-between'}}>
          <Grid item sx={{ display: 'flex',  flexDirection:'column'}}>
            <Grid item sx={{display: 'flex', alignItems:'center'}}>
              <ClockIcon color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                Editado: <b></b>
                {props.new.Edition_date}
              </Typography>
            </Grid>
            <Grid item sx={{display: 'flex', alignItems:'center', paddingTop:'4px'}}>
              <ClockIcon color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                Finalización: <b></b>
                {props.new.Finish_date}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
            <Button onClick={props.onClick} id={props.id} variant="outlined">Ver Más</Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}