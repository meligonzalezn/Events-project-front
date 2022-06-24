import PropTypes from "prop-types";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";

export const EventCard = ({ event, ...rest }) => {
  const image_url = () => {
    if (event.Media_file === null) {
      return "https://res.cloudinary.com/dxx9kwg6t/" + event.Media_file;
    }
    return event.Media_file;
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent sx={{ padding: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <img
            style={{ height: "290px", width: "100%", objectFit: "cover" }}
            alt="Event-image"
            src={image_url()}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://res.cloudinary.com/dxx9kwg6t/image/upload/v1655159261/media/images_videos_news/il-news-and-press-default-card-img_kcsr9g.jpg";
            }}
            variant="square"
          />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {event.Title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
          sx={{ marginBottom: "8.4px" }}
        >
          {event.Details}
        </Typography>
        
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
      <Grid container spacing={0.7} sx={{ justifyContent: "space-between" }}>
          <Grid item sx={{ alignItems: "center", display: "flex" }}>
            <ClockIcon color="action" />

            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Inicio: <b></b>
              {event.Start_date}
            </Typography>
          </Grid>
          <Grid item sx={{ alignItems: "center", display: "flex" }}>
            <ClockIcon color="action" />

            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Finalización: <b></b>
              {event.Finish_date}
            </Typography>
          </Grid>
        
        <Grid item sx={{ alignItems: 'center', display: 'flex' }}> 
          <Button variant="outlined" >
            Participantes
          </Button>
        </Grid>
        <Grid item sx={{ alignItems: 'center', display: 'flex' }}> 
          <Button color="primary" variant="contained">
            Actividades
          </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};
