import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';
import ShowNews from 'src/components/lists/ShowNews';

export default function Noticias(props) {

  return (
    <>
      <Head>
        <title>
          Noticias
        </title>
      </Head>

      <ShowNews />
    </>
  )
}

Noticias.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);