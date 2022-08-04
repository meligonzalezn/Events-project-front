import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function CardCostAndPay(props) {
  const [actividad, setActividad] = useState([]);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const gettedActivity = JSON.parse(localStorage.getItem("actividad"));
    setActividad(gettedActivity);

    let totalCost = gettedActivity.cost;
    setCost(totalCost);
  }, [])

  const getActivityComponent = () => {
    return (
      <Typography align='center' color="textSecondary" variant="body" >
        {actividad.title}
      </Typography>
    )
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
          {getActivityComponent()}
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