import { Grid } from "@mui/material";
import AccordionPayMethods from "./AccordionPayMethods";
import CardCostAndPay from "./CardCostAndPay";

/**
 * 
 * @param {{setValidStep: function, validateData: boolean,
 *          setValidateData: function, setPayMethodSelected: function}} props 
 * @returns 
 */
export default function PayMethod(props) {
  return (
    <Grid container spacing={4} px={12}>
      <Grid item lg={8} md={6} xs={12} >
        <AccordionPayMethods setValidStep={props.setValidStep} validateData={props.validateData}
          setValidateData={props.setValidateData} setPayMethodSelected={props.setPayMethodSelected} />
      </Grid>
      <Grid item lg={4} md={6} xs={12} >
        <CardCostAndPay />
      </Grid>
    </Grid>
  )
}