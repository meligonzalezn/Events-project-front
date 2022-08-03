import { Box } from "@mui/system";
import Head from "next/head";
import { DashboardLayout } from "src/components/dashboard-layout";
import ViewEvent from "src/components/events/ViewEvent";

export default function VerEventos() {

  return (
    <>
      <Head>
        <title>
          Ver Evento
        </title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <ViewEvent></ViewEvent>
      </Box>
    </>
  )
}

VerEventos.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);