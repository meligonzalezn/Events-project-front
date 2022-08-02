import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';
import ShowNews from 'src/components/lists/ShowNews';

export default function Noticias(props) {

  // TODO obtener el rol del usuario de la sesión.

  return (
    <>
      <Head>
        <title>
          Noticias
        </title>
      </Head>
      <ShowNews isEmployee={true} />
    </>
  )
}

Noticias.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);