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

export default function AccordionPayMethods() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /**
   * Obtiene el icono a desplegar según la selección del usuario.
   */
  const getIcon = (componentName) => {
    if (expanded == componentName) return <RadioButtonCheckedIcon />;
    return <RadioButtonUncheckedIcon />;
  }

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={getIcon('panel1')}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <CreditCardIcon />
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;Tarjeta de Crédito
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <PayCard />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={getIcon('panel2')}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <CreditCardIcon />
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;Tarjeta de Débito
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PayCard />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={getIcon('panel3')}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >

          <AccountBalanceIcon />

          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;Transferencia desde tu banco con PSE
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={getIcon('panel4')}
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
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
