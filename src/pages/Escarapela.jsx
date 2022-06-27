import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';
import ShowBadge from 'src/components/badge/ShowBadge';

export default function Escarapela(props) {

  // TODO obtener el rol del usuario de la sesión.

  return (
    <>
      <Head>
        <title>
          Escarapela
        </title>
      </Head>

      <ShowBadge />
    </>
  )
}

Escarapela.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);