import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { is_logged } from 'src/utils/loginAxios';
import Login from './login';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [Logged, setLogged] = useState(false)

  const router = useRouter()

  useEffect(async () => {
    const [_, error] = await is_logged();
    if(error){
      setLogged(false)
      router.push("/login")
    }else{
      setLogged(true)
    }
  },[router.asPath])

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Material Kit Pro
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>

      {Logged ?
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </LocalizationProvider>
      : <Login></Login>
      }
    </CacheProvider>
  );
};

export default App;
