import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { lightTheme, darkTheme, MaterialUISwitch} from '../theme';
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
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          {Loading ?
            <h1>Cargando :)</h1>
            :
            Logged ?
              HasAccess ?
              <>
              <FormGroup>
                <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                />
              </FormGroup> 
                {getLayout(
                  <Component {...pageProps} />)}
              </>
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
