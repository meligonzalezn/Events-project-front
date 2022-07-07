import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Grid } from '@mui/material';
import { Container } from '@mui/system';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

/**
 * 
 * @param {{upperMessage: string, lowerMessage: string,
 *          setValidStep: function}} props 
 * @returns 
 */
export default function SecuentialLoader(props) {
  const [progress, setProgress] = React.useState(0);
  const [endLoading, setEndLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (progress !== 100) return;

    setTimeout(() => {
      setEndLoading(true);
    }, 800)
  }, [progress])

  React.useEffect(() => {
    if (!endLoading) return;
    props.setValidStep(true);
  }, [endLoading])

  return (

    <Box px={15}>
      <Card>
        <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
          <Container maxWidth={false}>

            <Typography sx={{ py: 4 }} align="center" color="textPrimary" gutterBottom variant="h5">
              {!endLoading ? props.upperMessage : "Tu pago ha sido procesado con éxito"}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
              <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={progress} />
              </Box>
            </Box>

            <Typography sx={{ pt: 14 }} align="center" color="textPrimary" gutterBottom variant="h5">
              {!endLoading ? props.lowerMessage : "Has quedado inscrito al evento exitosamente"}
            </Typography>

          </Container>
        </Box>
      </Card>
    </Box>
  );
}
