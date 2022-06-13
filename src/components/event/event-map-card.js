import {

  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,

} from '@mui/material';

import  MapComponent from "../map/map"


export const MapsCard = (props) => {
  const {MapRender, getPlace} = MapComponent(); 
  const map = MapRender();
  
  return (
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
      {/* <MapRender/> */}
      {map}
      
      {/* </Box> */}
    </CardContent>
    
    <Divider />
  </Card>
)};
