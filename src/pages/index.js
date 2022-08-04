import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import LinearLoader from 'src/components/loaders/LinealLoader';
import { useRouter } from 'next/router';


const Dashboard = () => { 
  const router = useRouter();

  useEffect(() => {
    if(localStorage.getItem('userRole') == 'Cliente'){
      router.push('/Eventos')
      
    }
    else{
      router.push('/Reportes')
  
    }
  }, [])

  return(
  <>
    <Head>
      <title>
        ABC 
      </title>
    </Head>
    <LinearLoader
      upperMessage='Cargando...'
      lowerMessage='Por favor espera'
    ></LinearLoader>
  </>
);
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
