import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { has_perms, is_logged } from 'src/utils/loginAxios';
import Login from './login';
import NotFound from './404';
import '../components/news/styles.css';
import SignUp from './SignUp';
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import LinearLoader from 'src/components/loaders/LinealLoader';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [Logged, setLogged] = useState(false)  
  const [HasAccess, setHasAccess] = useState(false)
  const [Loading, setLoading] = useState(true)

  //Fast enter
  // const [Logged, setLogged] = useState(true)
  // const [HasAccess, setHasAccess] = useState(true)
  // const [Loading, setLoading] = useState(false)


  const router = useRouter()

  useEffect(() => {
    localStorage.setItem("actividad", '');
  }, [])

  useEffect(async () => {
    //User is logged?

    is_logged().then(([_, error]) => {

      setLogged(error == null)

      if (error == null) {
        //User has permissions ?
        has_perms(router.asPath).then(([_, error]) => {
          // console.log("actualizado ? ", _, error)
          setHasAccess(error == null)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })
  }, [router.asPath])

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          ABC App
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {Loading ?
            <LinearLoader></LinearLoader>
            :
            Logged ?
              HasAccess ?
                getLayout(<Component {...pageProps} />)
                :
                <NotFound />
              : <Login />
          }
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
