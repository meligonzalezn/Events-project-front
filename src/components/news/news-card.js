import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';

export const NewsCard = ({ news, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent sx={{padding:0}}>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3,
        }}
      >
        <img
          style={{height:'290px', width:'100%', objectFit:'cover'}}
          alt="Product"
          src={"https://res.cloudinary.com/dxx9kwg6t/"+news.Media_file}
          onError={(e)=>{e.target.onerror = null; e.target.src="https://res.cloudinary.com/dxx9kwg6t/image/upload/v1655159261/media/images_videos_news/il-news-and-press-default-card-img_kcsr9g.jpg"}}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {news.Title}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
        sx={{marginBottom:'8.4px'}}
      >
        {news.Summary}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <ClockIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Editado: <b></b>
            {news.Edition_date}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
 
);

NewsCard.propTypes = {
  news: PropTypes.object.isRequired
};
