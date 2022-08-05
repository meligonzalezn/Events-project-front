import { Box } from "@mui/system";
import Head from "next/head";
import { DashboardLayout } from "src/components/dashboard-layout";
import ViewNew from "src/components/news/ViewNew";

export default function VerNoticias(props) {


  return (
    <>
      <Head>
        <title>
          Ver Noticia
        </title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <ViewNew></ViewNew>
      </Box>
    </>
  )
}

VerNoticias.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);