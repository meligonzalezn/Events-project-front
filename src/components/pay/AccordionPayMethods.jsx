import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CardCostAndPay from './CardCostAndPay';
import PayCard from '../forms/PayCard';
import PayTransfer from '../forms/PayTransfer';

/**
 * 
 * @param {{setValidStep: function, validateData: boolean,
 *          setValidateData: function}} props 
 * @returns 
 */
export default function AccordionPayMethods(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [validateCard, setValidateCard] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect((() => {
    if (!props.validateData || !expanded) return;
    props.setValidateData(false);

    if (expanded === 'efectivo' || expanded === 'transferencia') {
      props.setValidStep(true);
      return;
    }

    setValidateCard(true);

  }), [props.validateData])

  /**
   * Obtiene el icono a desplegar según la selección del usuario.
   */
  const getIcon = (componentName) => {
    if (expanded == componentName) return <RadioButtonCheckedIcon />;
    return <RadioButtonUncheckedIcon />;
  }

  return (
    <div>
      <Accordion expanded={expanded === 'credito'} onChange={handleChange('credito')}>
        <AccordionSummary
          expandIcon={getIcon('credito')}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <CreditCardIcon />
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;Tarjeta de Crédito
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <PayCard setValidStep={props.setValidStep} validateCard={validateCard} setValidateCard={setValidateCard} cardType={'credito'} cardTypeSelected={expanded} />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'debito'} onChange={handleChange('debito')}>
        <AccordionSummary
          expandIcon={getIcon('debito')}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <CreditCardIcon />
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;Tarjeta de Débito
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PayCard setValidStep={props.setValidStep} validateCard={validateCard} setValidateCard={setValidateCard} cardType={'debito'} cardTypeSelected={expanded} />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'transferencia'} onChange={handleChange('transferencia')}>
        <AccordionSummary
          expandIcon={getIcon('transferencia')}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >

          <AccountBalanceIcon />

          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;Transferencia desde tu banco con PSE
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PayTransfer />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'efectivo'} onChange={handleChange('efectivo')}>
        <AccordionSummary
          expandIcon={getIcon('efectivo')}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <LocalAtmIcon />

          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;Efectivo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Puedes realizar el pago en los corresponsales de Efecty o Gane.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
