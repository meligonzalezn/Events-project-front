import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function CardCostAndPay(props) {
  const [actividades, setActividades] = useState([]);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    // ! Obtener la información de las actividades a las que el usuario se registra aquí.
    const gettedActivities = [
      { title: "Actividad 1", cost: 123000 },
      { title: "Actividad 2", cost: 456500 }];
    setActividades(gettedActivities);

    let totalCost = 0;
    for (let i = 0; i < gettedActivities.length; i++) {
      totalCost += gettedActivities[i].cost;
    }

    setCost(totalCost);
  }, [])

  const getActivitiesComponent = () => {
    return actividades.map((actividad) => (
      <Typography align='center' color="textSecondary" variant="body" >
        {actividad.title}
      </Typography>
    ))
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Typography align='center' color="#000000" variant="h6" >
            Resumen de Compra
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <Box sx={{ p: 3, gap: '0.75rem' }} >
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          {getActivitiesComponent()}
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 3, gap: '0.75rem' }} >
        <div className='wrapperLeftRight'>
          <Typography className='totallyLeftItem' color="#000000" variant="h5" >
            Pagas:
          </Typography>

          <Typography className='totallyRightItem' color="#000000" variant="h5" >
            $ {cost}
          </Typography>
        </div>
      </Box>
    </Card>
  )
}