import {

  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,

} from '@mui/material';

import  MapRender from "../map/map"


export const MapsCard = (props) => (
  <Card {...props}>
    <CardHeader title="Ubicación" subheader="¿Donde se realizará el evento?" />
    <Divider/>
    <CardContent>
    {/* <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    > */}
      <MapRender/>
      
      {/* </Box> */}
    </CardContent>
    
    <Divider />
  </Card>
);
