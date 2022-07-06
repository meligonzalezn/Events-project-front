import { Grid } from "@mui/material";
import AccordionPayMethods from "./AccordionPayMethods";
import CardCostAndPay from "./CardCostAndPay";

export default function PayMethod() {
  return (
    <Grid container spacing={4} px={12}>
      <Grid item lg={8} md={6} xs={12} >
        <AccordionPayMethods />
      </Grid>
      <Grid item lg={4} md={6} xs={12} >
        <CardCostAndPay />
      </Grid>
    </Grid>
  )
}