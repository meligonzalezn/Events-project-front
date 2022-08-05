import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { lightTheme, darkTheme, MaterialUISwitch } from '../theme';
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearLoader from 'src/components/loaders/LinealLoader';


const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [Logged, setLogged] = useState(false)
  const [HasAccess, setHasAccess] = useState(false)
  const [Loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const router = useRouter()

  useEffect(() => {
    localStorage.setItem("actividad", '');
  }, [])

  useEffect(async () => {
    //User is logged?

    const [_a, errorCheckLoggin] = is_logged()
    setLogged(errorCheckLoggin == null)

    if (errorCheckLoggin != null) {
      setLoading(false)
      return;
    }
    //User has permissions ?
    console.log("Permissions")
    const [response, _] = has_perms(router.asPath);
    setHasAccess(response !== null ? response : false)
    setLoading(false)

  }, [router.asPath])

const getLayout = Component.getLayout ?? ((page) => page);


if (typeof window !== "undefined") {
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
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          {Loading ?
            <LinearLoader></LinearLoader>
            :
            Logged ?
              HasAccess ?
                <>
                  <FormGroup>
                    <FormControlLabel
                      control={<MaterialUISwitch sx={{ m: 1, zIndex: '2000', fontSize: '0.5rem' }} checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                      label="mui toggle"
                    />
                  </FormGroup>
                  {getLayout(
                    <Component {...pageProps} />)}
                </>
                :
                <NotFound />
              : router.asPath === "/SignUp" ?
                <SignUp />
                :
                <Login />
          }
        </ThemeProvider>

      </LocalizationProvider>
    </CacheProvider>
  );
} else return (<></>)
};

export default App;
