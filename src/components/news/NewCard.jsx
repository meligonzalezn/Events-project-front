import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';

/**
 * Crea y retorna una Card con la información pertinente a una noticia.
 * @param {{new: object, onClick: function, id: string}} props 
 * @returns React Component
 */
export const NewCard = (props) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
        <Avatar alt="Product" src={props.new.media} variant="square" />
      </Box>

      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {props.new.title}
      </Typography>

      <Typography align="center" color="textPrimary" variant="body1">
        {props.new.description}
      </Typography>
    </CardContent>

    <Box sx={{ flexGrow: 1 }} />

    <Divider />

    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
          <ClockIcon color="action" />

          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            Updated 2hr ago
          </Typography>
        </Grid>

        <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
          <Button onClick={props.onClick} id={props.id} variant="outlined">Ver Más</Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
);
