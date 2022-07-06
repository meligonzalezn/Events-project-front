import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

/**
 * 
 * @param {{activeStep: int, setActiveStep: function, validStep: boolean,
 *          setValidStep: function, setValidateData: function,
 *          validateData: boolean}} props 
 * @returns 
 */
export default function PayStepper(props) {

  React.useEffect(() => {
    if (!props.validStep) return;

    props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
    props.setValidStep(false);
  }, [props.validStep])

  const handleNext = () => {
    props.setValidateData(!props.validateData);
  };

  const handleBack = () => {
    props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    props.setValidStep(false);
  };

  const handleReset = () => {
    props.setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {props.activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={props.activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {props.activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
