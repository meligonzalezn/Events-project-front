import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardLayout } from "src/components/dashboard-layout";
import ViewNew from "src/components/news/ViewNew";

export default function VerNoticias() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>
          Ver Noticia
        </title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <ViewNew id={id}></ViewNew>
      </Box>
    </>
  )
}

VerNoticias.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);